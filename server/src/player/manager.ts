import { cloneDeep } from "lodash";
import { Player } from "../../../client/src/types/player.types";
import { GameManager, Operation } from "../game/manager";

export class PlayerManager {
  constructor(
    public gameManager: GameManager,
    public socketId: string,
    public aliasSocketIds: string[] = []
  ) {}

  _broadcast(): void {
    this._withPointer((pointer) => {
      this.gameManager._mutate((g) => {
        g.players[pointer.id] = pointer;
      });
    });
  }

  _mutate(mutativeCb: (player: Player) => void) {
    this._withPointer((pointer) => {
      mutativeCb(pointer);
      this._broadcast();
    });
  }

  _pointer(): Player | undefined {
    const operation = this.gameManager._withPointer((pointer) => {
      const canonicalId = [this.socketId, ...this.aliasSocketIds].find(
        (id) => pointer.players[id]
      );
      return canonicalId ? pointer.players[canonicalId] : undefined;
    });
    if (operation.status === "success") {
      return operation.result;
    }
  }

  _set(player: Player): void {
    this.gameManager.setWithPointer((gamePointer) => ({
      ...gamePointer,
      players: {
        ...gamePointer.players,
        [this.socketId]: player,
      },
    }));

    this._broadcast();
  }

  _withPointer<T = void>(cb: (playerPointer: Player) => T): Operation<T> {
    const pointer = this._pointer();
    if (pointer) {
      const result = cb(pointer);
      return { status: "success", result };
    } else {
      return { status: "error" };
    }
  }

  public getNameOrFail(): string {
    const name = this._pointer()?.name;
    if (!name) throw new Error("Couldn't find a name");
    return name;
  }

  public set(player: Player): void {
    this._set(player);
  }

  public snapshot(): Player | undefined {
    const operation = this._withPointer((pointer) => cloneDeep(pointer));
    if (operation.status === "success") {
      return operation.result;
    }
  }

  public update(mutativeCb: (player: Player) => void) {
    this._mutate(mutativeCb);
  }
}

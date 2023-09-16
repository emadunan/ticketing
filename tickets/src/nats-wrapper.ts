import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;


  public get client(): Stan {
    if (!this._client) {
      throw new Error("Cannot access nats client before connecting");
    }

    return this._client;
  }


  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("Connect to NATS");
        resolve();
      });

      this._client!.on("error", (err) => {
        reject(err);
      })
    })
  }
}

export const natsWrapper = new NatsWrapper();
declare module "typewriter-effect" {
  interface TypewriterClass {
    state: Record<string, unknown> & {
      eventLoopPaused: boolean;
      elements: {
        wrapper: HTMLElement;
        cursor: HTMLElement;
        container: HTMLElement | null;
      };
    };

    addEventToQueue(
      eventName: string,
      eventArgs: object | null,
      prepend: boolean = true
    ): void;
  }
}

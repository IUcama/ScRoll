
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let session: any;

export const SessionHandler = {
    getSession: () => session,
    setSession: (s: unknown) => session = s,
    destroySession: () => session.destroy(),
};

export default SessionHandler;

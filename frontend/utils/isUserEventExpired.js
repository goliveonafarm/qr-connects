const isUserEventExpired = (creationTime, expirationTime) => {
    const currentTime = new Date().getTime();
    const creationTimeInMs = new Date(creationTime).getTime();
    const expirationTimeInMs = new Date(expirationTime).getTime();
    return currentTime > expirationTimeInMs || currentTime < creationTimeInMs;
}

export default isUserEventExpired;
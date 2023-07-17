function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function initUuid(){
    const currentUuid = getUuid()

    if (getUuid() != "")
    {
        return currentUuid
    }

    const newUuid = generateUuid()
    localStorage.setItem("uuid", newUuid)
    return newUuid
}

export function getUuid(){
    return localStorage.getItem("uuid") || ""
}

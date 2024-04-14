const setStorageItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const getStorageItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

const addStorageItem = (key, value) => {
  const itemData = getStorageItem(key)
  itemData.push(value)
  setStorageItem(key, itemData)
}

const editStorageItem = (key, value, codeField) => {
  const itemData = getStorageItem(key)
  itemData.forEach((item, index) => {
    if (item[codeField] === value[codeField]) {
      itemData[index] = value
    }
  })
  setStorageItem(key, itemData)
}

const deleteStorageItem = (key, code, codeField) => {
  let itemData = getStorageItem(key)
  itemData = itemData.filter(item => item[codeField] !== code)
  setStorageItem(key, itemData)
}

export {
  setStorageItem,
  getStorageItem,
  addStorageItem,
  editStorageItem,
  deleteStorageItem
}

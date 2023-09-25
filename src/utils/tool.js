async function judgeFileType(file, type = 'image') {
  const binHeadMap = {
    image: {
      png: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
      jpeg: [0xff, 0xd8, 0xff],
      gif: [0x47, 0x49, 0x46, 0x38],
      bmp: [0x42, 0x4d],
    },
  };
  if (!file || !binHeadMap[type]) return;
  const buffers = await readBuffer(file, 0, 8);
  console.log(buffers);
  const uint8Array = new Uint8Array(buffers);
  let flag = false;
  for (let key in binHeadMap[type]) {
    flag = binHeadMap[type][key]?.every(
      (item, index) => item === uint8Array?.[index]
    );
    if (flag) break;
  }
  return flag;
}

function readBuffer(file, start = 0, end = 2) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file.slice(start, end));
  });
}

function isMobileDevice() {
  return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
export { judgeFileType, isMobileDevice };

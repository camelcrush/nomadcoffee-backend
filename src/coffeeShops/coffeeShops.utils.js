import { createWriteStream } from "fs";

export const processCategories = (keyword) => {
  const categories = keyword.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
  return categories.map((category) => ({
    where: { name: category },
    create: { name: category },
  }));
};

export const handleFile = async (file) => {
  const { filename, createReadStream } = await file;
  const newFilename = `${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = createWriteStream(
    `${process.cwd()}/uploads/${newFilename}`
  );
  readStream.pipe(writeStream);
  const fileUrl = `http://localhost:4000/static/${newFilename}`;
  return fileUrl;
};

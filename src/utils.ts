export const readFileAsBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve(reader.result?.toString()?.split(",")[1] || "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getAttachments = async (attachments: File[]) => {
  const updatedAttachments = await Promise.all(
    attachments.map(async (file) => {
      const contents = await readFileAsBase64(file);
      return {
        filename: file.name,
        content: contents,
        disposition: "attachment",
        type: file.type,
      };
    })
  );

  return updatedAttachments;
};

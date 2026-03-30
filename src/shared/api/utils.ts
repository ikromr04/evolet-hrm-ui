const getFieldFromPointer = (pointer?: string): string | null => {
  if (!pointer) return null;

  return pointer.split('/').pop() || null;
};

export { getFieldFromPointer };

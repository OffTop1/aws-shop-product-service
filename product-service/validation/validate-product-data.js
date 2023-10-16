
const productSchema = ['id', 'title', 'description', 'price'];

const validateProductData = data => {
  return productSchema.every(key => key in data)
}

export { validateProductData };

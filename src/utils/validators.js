export function validate(formData) {
  const errors = {}

  if (!/^[a-zA-Z0-9 ]{3,}$/.test(formData.title)) {
    errors.title = "Title must be at least 3 characters, letters and numbers only"
  }

  if (!/^.{10,}$/.test(formData.description)) {
    errors.description = "Must be at least 10 characters long"
  }

  if (!formData.date) {
    errors.date = "Date is required"
  }

  if (!/^[a-zA-Z ]+$/.test(formData.category)) {
    errors.category = "Only alphabetic characters and spaces allowed"
  }

  if (!/^f[0-9]{8}@(pilani|goa|hyderabad)\.bits-pilani\.ac\.in$/.test(formData.email)) {
    errors.email = "Must be a valid BITS email"
  }

  if (!/^(20[0-9]{2}A[0-9][A-Z]{2}[0-9]{4}P|20[0-9]{2}B[0-9]PS[0-9]{4}P|20[0-9]{2}B[0-9]A[0-9][0-9]{4}P)$/.test(formData.bitsId)) {
    errors.bitsId = "Must be a valid BITS ID"
  }

  return errors
}
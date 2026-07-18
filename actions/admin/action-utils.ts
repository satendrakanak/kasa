import { revalidatePath } from "next/cache";

export function formObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export function formArray(formData: FormData, key: string) {
  return formData.getAll(key).map(String);
}

export function revalidateAdminLicensePaths() {
  revalidatePath("/admin");
  revalidatePath("/admin/licenses");
  revalidatePath("/admin/licenses/products");
}

import { DefineComponent } from "vue";
import x from "axios";
export default async function handleSubmit(c: DefineComponent): Promise<void> {
  try {
    console.log(c.formData);
    if (!c.isFetchAvailable) return;
    c.isFetchAvailable = false;
    c.loading = true;
    try {
      const res = await x.post("http://localhost/api/fetch_data.php", c.formData);
      if (res.status.toString().startsWith("4")) {
        c.loading = false;
        throw new Error(`Failed to contact fetch endpoint`);
      }
      console.log("Request was sucessful!");
      console.log(res);
      c.loading = false;
    } catch (e) {
      console.error(`Error:${(e as Error).message}`);
    } finally {
      setTimeout(() => {
        c.isFetchAvailable = true;
      }, 500);
    }
  } catch (e) {
    console.error(`Error executing handleSubmit:\n${(e as Error).message}`);
  }
}

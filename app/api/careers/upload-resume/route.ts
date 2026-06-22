import { jsonData, toErrorResponse } from "@/lib/api/errors";
import { uploadResume } from "@/lib/api/webhook/careers";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = await uploadResume(formData);
    return jsonData(data, 201);
  } catch (error) {
    return toErrorResponse(error);
  }
}

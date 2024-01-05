import { EmailTemplate } from "../../_components/email-template";
import { Resend } from "resend";

const resend = new Resend("re_XVAVNk15_5V5i6znnpZzUzv1p74bTyuqE");

export async function POST(req) {
  const response = await req.json();
  try {
    const { data } = await resend.emails.send({
      from: "stardust@resend.dev",
      to: ["csyadav0513@gmail.com"],
      subject: response?.fullName + "share file with you",
      react: EmailTemplate({ response }),
    });
    console.log("hello" + data);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}

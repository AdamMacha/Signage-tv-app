import { NextRequest, NextResponse } from "next/server";
import { leadSubmissionSchema } from "@/lib/validations";
import { sendLeadEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = leadSubmissionSchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.errors.forEach((err) => {
        const path = err.path.join(".");
        fieldErrors[path] = err.message;
      });

      return NextResponse.json(
        {
          success: false,
          error: "Zadaná data obsahují chyby. Zkontrolujte prosím formulář.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const leadData = parseResult.data;
    const sendResult = await sendLeadEmail(leadData);

    if (!sendResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: sendResult.error || "Při odesílání formuláře došlo k chybě.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Děkujeme. Vaši poptávku jsme úspěšně přijali a brzy se vám ozveme.",
      isDemo: sendResult.isDemo ?? false,
    });
  } catch (error: any) {
    console.error("API Lead route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Došlo k neočekávané chybě serveru. Zkuste to prosím znovu.",
      },
      { status: 500 }
    );
  }
}

import { z } from "zod";

export const advertiserSchema = z.object({
  type: z.literal("advertiser").default("advertiser"),
  name: z.string().min(2, "Zadejte prosím vaše jméno (minimálně 2 znaky)"),
  company: z.string().min(2, "Zadejte prosím název vaší firmy"),
  email: z.string().email("Zadejte platnou e-mailovou adresu"),
  phone: z.string().min(8, "Zadejte platné telefonní číslo"),
  website: z.string().optional().or(z.literal("")),
  location: z.string().min(2, "Zadejte cílové město nebo region"),
  budget: z.enum([
    "Do 5 000 Kč",
    "5 000–10 000 Kč",
    "10 000–25 000 Kč",
    "25 000–50 000 Kč",
    "50 000+ Kč",
    "Nevím, potřebuji poradit",
  ], {
    errorMap: () => ({ message: "Vyberte prosím přibližný rozpočet" }),
  }),
  message: z.string().optional(),
});

export type AdvertiserFormData = z.infer<typeof advertiserSchema>;

export const venueHostSchema = z.object({
  type: z.literal("venue").default("venue"),
  name: z.string().min(2, "Zadejte prosím vaše jméno (minimálně 2 znaky)"),
  company: z.string().min(2, "Zadejte název provozovny či firmy"),
  email: z.string().email("Zadejte platnou e-mailovou adresu"),
  phone: z.string().min(8, "Zadejte platné telefonní číslo"),
  address: z.string().min(3, "Zadejte adresu nebo lokalitu prostoru"),
  venueType: z.enum([
    "Restaurace",
    "Kavárna",
    "Hotel",
    "Fitness",
    "Obchod",
    "Čekárna",
    "Kancelář",
    "Autoservis",
    "Salon",
    "Jiné",
  ], {
    errorMap: () => ({ message: "Vyberte prosím typ prostoru" }),
  }),
  footTraffic: z.string().min(1, "Vyberte přibližnou denní návštěvnost"),
  ownership: z.enum(["Vlastní prostor", "Dlouhodobý pronájem"], {
    errorMap: () => ({ message: "Vyberte vlastnický vztah k prostoru" }),
  }),
  message: z.string().optional(),
});

export type VenueHostFormData = z.infer<typeof venueHostSchema>;

export const leadSubmissionSchema = z.discriminatedUnion("type", [
  advertiserSchema,
  venueHostSchema,
]);

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

import { InvitationsMap } from "@/types/invitation";

export const invitations: InvitationsMap = {
  "haris-cut": {
    slug: "haris-cut",
    meta: {
      title: "Undangan Pernikahan Haris & Cut",
      description:
        "Dengan penuh syukur dan kebahagiaan, kami mengundang Anda untuk menyaksikan pernikahan kami.",
    },
    groom: {
      name: "Haris Akbar, Lc., M. Ag.",
      father: "Zahari Efendi",
      mother: "Nur Ismayati",
    },
    bride: {
      name: "Cut Chairunnisa, A. Md. Par.",
      father: "T. Muchtaruddin (Alm)",
      mother: "Cut Zuraida",
    },
    opening: {
      title: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم",
      subtitle:
        "Dengan memohon rahmat dan ridha Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami.",
    },
    event: {
      akad: {
        date: "Kamis, 02 Juli 2026",
        dateISO: "2026-07-02T09:00:00+07:00",
        time: "09.00 WIB",
        timezone: "WIB",
        venue: "Masjid Agung Sultan Jeumpa",
        address: "Bireuen, Aceh",
        mapsUrl: "https://maps.app.goo.gl/in3AA9G5zewCVpWc6",
      },
      resepsi: {
        date: "Kamis, 02 Juli 2026",
        dateISO: "2026-07-02T10:00:00+07:00",
        time: "10.00 WIB",
        timezone: "WIB",
        venue: "Kediaman Mempelai Pria",
        address: "Krueng Juli Timu, Kuala, Bireuen, Aceh",
        mapsUrl: "https://maps.app.goo.gl/in3AA9G5zewCVpWc6",
      },
    },
    quranVerse: {
      arabic:
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
      translation:
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
      source: "QS. Ar-Rum: 21",
    },
    closing: {
      message:
        "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada putra-putri kami. Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami mengucapkan terima kasih.",
      signature: "Haris & Cut",
    },
    music: "/audio/background.mp3",
  },
};

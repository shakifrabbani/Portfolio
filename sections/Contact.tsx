import { Download, Globe2, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { profile, whatsappUrl } from "@/data/profile";
import { withBasePath } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 sm:py-24">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-line-strong bg-[linear-gradient(135deg,rgb(108_99_255/0.18),rgb(79_140_255/0.06)_45%,rgb(255_255_255/0.02))] p-6 sm:p-10 lg:p-14">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-32 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(108_99_255/0.35),transparent)] animate-aurora" />
              <div className="absolute -bottom-40 left-1/4 size-[380px] rounded-full bg-[radial-gradient(closest-side,rgb(79_140_255/0.22),transparent)]" />
              <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,#000_20%,transparent_70%)]" />
            </div>

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:items-center">
              <div>
                <p className="section-label">Contact</p>
                <h2 id="contact-title" className="mt-3 font-display text-[2.2rem] font-extrabold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl lg:text-[3.3rem]">
                  Have an opportunity in mind?{" "}
                  <span className="text-gradient block">Let&apos;s build something meaningful.</span>
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fg-2 sm:text-base">
                  I&apos;m open to software engineering roles, freelance projects and collaborations on web, mobile and business applications.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={whatsappUrl} size="lg" external ariaLabel="Start a conversation on WhatsApp">
                    <WhatsAppIcon className="size-4" /> Start a Conversation <ButtonArrow />
                  </Button>
                  <Button href={withBasePath(profile.resumePath)} variant="secondary" size="lg" download>
                    <Download className="size-4" aria-hidden="true" /> Download Resume
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-ink/80 p-2">
                <ContactRow label="Email" icon={<span className="text-[13px] font-semibold">@</span>}>
                  <a href={`mailto:${profile.email}`} className="truncate font-medium text-fg hover:text-accent-ink">
                    {profile.email}
                  </a>
                  <CopyButton value={profile.email} label="Copy email address" className="ml-auto" />
                </ContactRow>
                <ContactRow label="WhatsApp" icon={<WhatsAppIcon className="size-4" />}>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="truncate font-medium text-fg hover:text-accent-ink">
                    {profile.whatsapp.display}
                  </a>
                  <CopyButton value={`+${profile.whatsapp.number}`} label="Copy WhatsApp number" className="ml-auto" />
                </ContactRow>
                <ContactRow label="LinkedIn" icon={<LinkedInIcon className="size-4" />}>
                  <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="truncate font-medium text-fg hover:text-accent-ink">
                    in/shakif-rabbani
                  </a>
                </ContactRow>
                <ContactRow label="GitHub" icon={<GitHubIcon className="size-4" />}>
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="truncate font-medium text-fg hover:text-accent-ink">
                    github.com/{profile.socials.githubUser}
                  </a>
                </ContactRow>
                <ContactRow label="Location" icon={<MapPin className="size-4" aria-hidden="true" />}>
                  <span className="font-medium text-fg">{profile.location}</span>
                </ContactRow>
                <ContactRow label="Availability" icon={<Globe2 className="size-4" aria-hidden="true" />} last>
                  <span className="inline-flex items-center gap-2 font-medium text-fg">
                    <span className="size-2 rounded-full bg-success" aria-hidden="true" />
                    Full-time, remote &amp; freelance
                  </span>
                </ContactRow>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({ label, icon, children, last }: { label: string; icon: ReactNode; children: ReactNode; last?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-3.5 ${last ? "" : "border-b border-line"}`}>
      <span className="icon-tile size-9 rounded-[10px]">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-fg-3">{label}</p>
        <div className="mt-0.5 flex min-w-0 items-center gap-2 text-sm">{children}</div>
      </div>
    </div>
  );
}

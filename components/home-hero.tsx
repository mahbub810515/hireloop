import Link from "next/link"
import Image from "next/image"
import {
  BriefcaseIcon,
  Building2Icon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "cn"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const stats = [
  { icon: BriefcaseIcon, value: "50K", label: "Active Jobs" },
  { icon: Building2Icon, value: "12K", label: "Companies" },
  { icon: UsersIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
]

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 pt-16 text-center sm:px-6 md:pt-24 lg:px-8">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-4 py-1.5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <BriefcaseIcon className="size-3.5 text-orange-400" />
          <span className="font-semibold text-foreground">50,000+</span>
          <span>new jobs this month</span>
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
          Find Your Dream Job Today
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-balance text-muted-foreground sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form
          action="/jobs"
          method="get"
          className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-full border bg-card/60 p-2 pr-2 pl-5 backdrop-blur"
        >
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            name="q"
            placeholder="Job title, skill or company"
            className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <div className="h-5 w-px shrink-0 bg-border" />
          <MapPinIcon className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            name="location"
            placeholder="Location or Remote"
            className="hidden h-9 w-44 min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground sm:block"
          />
          <button
            type="submit"
            aria-label="Search jobs"
            className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 outline-none"
          >
            <SearchIcon className="size-4" />
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-muted-foreground">Trending Position</span>
          {trendingPositions.map((position) => (
            <Link
              key={position}
              href={`/jobs?category=${encodeURIComponent(position)}`}
              className="rounded-full border bg-card/40 px-3 py-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {position}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-2 h-[480px] max-w-7xl sm:h-[560px] md:h-[780px]">
        <Image
          src="/images/globe.png"
          alt=""
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-background via-background/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <p className="absolute inset-x-0 top-[55%] mx-auto max-w-sm px-4 text-center text-lg text-balance text-foreground/70 sm:top-[58%] md:top-[64%] md:text-2xl">
          Assisting over{" "}
          <span className="font-semibold text-foreground">
            15,000 job seekers
          </span>{" "}
          find their dream positions.
        </p>

        <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-3 px-4 pb-6 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border bg-card/70 p-4 text-left backdrop-blur"
            >
              <stat.icon
                className={cn("size-4 text-muted-foreground")}
                aria-hidden
              />
              <p className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

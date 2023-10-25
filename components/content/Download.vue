<template>
  <div>
    <template v-if="error">
      <a :href="`https://github.com/${repo}/releases`">See the releases page on GitHub</a>
    </template>

    <template v-if="latestRelease">
      <div class="mb-2">
        <strong>Latest version:</strong> {{ latestRelease.version }}
      </div>

      <div class="d-flex gap-3">
        <template v-for="asset in latestRelease.assets">
          <a class="btn btn-outline-primary" :href="asset.download_url">
            {{ asset.name }}
            <span class="badge text-bg-primary ms-1">
              {{ asset.download_count }}
              <span class="visually-hidden">downloads</span>
            </span>
          </a>
        </template>
      </div>

      <div class="mt-3">
          <a href="#" @click.prevent="showOldVersions = !showOldVersions">
          {{ showOldVersions ? 'Hide' : 'Show' }} old versions
        </a>
      </div>
    </template>

    <div v-show="showOldVersions" class="border border-radius p-4 mt-3">
      <div class="text-center small">
        <strong>Note:</strong> Only the latest 100 releases are shown here. For older versions, <a :href="`https://github.com/${repo}/releases`">see the releases page on GitHub</a>.
      </div>

      <hr class="mb-0" />

      <div v-for="version in majorVersions">
        <h3>Version {{ version.major }}</h3>

        <template v-for="(release, index) in version.releases">
          <div
            :class="[index % 2 === 0 ? 'bg-body-secondary' : '', 'p-3', index === 0 ? 'border-bottom bg-primary-subtle' : 'py-2']">
            <div class="row">
              <div class="col align-self-center">
                <span :class="index === 0 && 'fw-bold'">{{ release.version }}</span>
              </div>
              <div class="col-auto">
                <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                  <template v-for="asset in release.assets">
                    <a :class="['btn btn-light', index > 0 && 'btn-sm']" :href="asset.download_url">
                      {{ asset.name }}
                      <span class="badge text-bg-dark ms-1">
                        {{ asset.download_count }}
                        <span class="visually-hidden">downloads</span>
                      </span>
                    </a>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import semverParse from "semver/functions/parse"
import semverCompare from "semver/functions/compare"

const showOldVersions = ref(false)

const props = defineProps<{
  repo: string
}>()

const { data, refresh, pending, error } = useLazyFetch(`https://api.github.com/repos/${props.repo}/releases?per_page=100`)

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    const value = key(x);
    (rv[value] = rv[value] || []).push(x);
    return rv;
  }, {});
};

const majorVersions = computed(() => {
  const releases = (data.value as any[] ?? [])
    .map(r => ({
      version: semverParse(r.tag_name),
      created_at: r.created_at,
      assets: r.assets.map(a => ({
        name: a.name,
        download_url: a.browser_download_url,
        download_count: a.download_count
      }))
    }))

  const releaseByMajor = groupBy(releases, r => r.version.major)
  const groups = Object.entries(releaseByMajor)

  groups.sort((a, b) => b[0] - a[0])

  for (const item of groups) {
    item[1].sort((a, b) => {
      return semverCompare(b.version, a.version)
    })

    for (const release of item[1]) {
      release.assets.sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  return groups.map(([major, releases]) => ({
    major,
    releases: releases.map(r => ({
      version: r.version,
      created_at: r.created_at,
      assets: r.assets.map(a => ({
        name: a.name,
        download_url: a.download_url,
        download_count: a.download_count
      }))
    }))
  }))
})

const latestRelease = computed(() => majorVersions.value[0]?.releases[0] ?? null)
</script>
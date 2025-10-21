<template>
    <aside class="w-64 bg-card border-r border-border flex flex-col p-6">
      <h1 class="text-2xl font-bold tracking-tight mb-10">Routin</h1>
      <nav class="flex flex-col space-y-2">
        <router-link to="/" class="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent" active-class="bg-accent text-foreground">
          Dashboard
        </router-link>
        <router-link to="/today" class="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent" active-class="bg-accent text-foreground">
          Today
        </router-link>
        <router-link to="/manage" class="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent" active-class="bg-accent text-foreground">
          Manage Habits
        </router-link>
      </nav>
      <div class="mt-auto">
        <div class="p-3 bg-background rounded-lg flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-primary"></div>
          <span class="font-semibold">Alan</span>
        </div>
      </div>
    </aside>
  </template>
<template>
  <div>
    <v-card flat>
      <v-toolbar color="transparent">
        <v-toolbar-title text="Lista de Clubes"></v-toolbar-title>

        <template v-slot:append>
          <v-btn icon="mdi-sort"></v-btn>
          <v-btn icon="mdi-filter-settings-outline"></v-btn>
          <v-btn icon="mdi-magnify"></v-btn>
        </template>
      </v-toolbar>

      <v-divider />

      <v-list>
        <v-list-item>
          <v-list-item-title> Pedrta ANgula</v-list-item-title>
          <v-list-item-subtitle> fds</v-list-item-subtitle>

          <template v-slot:append>
            <v-list-item-action>
              <v-btn variant="flat" icon="mdi-dots-vertical"></v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script setup></script>

<template>
  <div class="notatki">
    <h1>Notatki</h1>
  </div>
  <div>
    <ul class="notatkiLista" v-if="pokazNotatke">
      <li class="notatkiElement" v-for="notatka in zapis" :key="notatka">
        <button class="usun" @click="usunNotatke(notatka.id)">X</button>
        <div class="notatkiContent" >
          <strong>{{ notatka.przedmiot }}</strong> - {{ notatka.zaliczenie }}<br />
          {{ notatka.termin }}<br />
          {{ notatka.notatka }}<br />
        </div>
      </li>
    </ul>
    <button class="pokaz" @click="pokazNotatki">Notatki</button>
  </div>

  <!-- TODO
  Możliwość zapisywania notatek, 
  terminów zaliczeń, deadlinów w terminarzu -->
</template>

<script>
export default {
  name: "Notatki",
  data() {
    return {
      zapis: [],
      pokazNotatke: true,
    };
  },
  mounted() { // pobieranie listy notatek z db.json przy starcie komponentu
    fetch("http://localhost:3000/notatki").then((res) => {
      res
        .json()
        .then((data) => (this.zapis = data))
        .catch((err) => console.log(err.message));
    });
  },
  methods: {
    pokazNotatki() {
      this.pokazNotatke = !this.pokazNotatke;
      console.log("pokaz");
    },
    usunNotatke(id){
      fetch("http://localhost:3000/notatki/"+id, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      alert("Usuniętko notatke ["+id+"]");
      window.location.reload();
    }
  },
};
</script>

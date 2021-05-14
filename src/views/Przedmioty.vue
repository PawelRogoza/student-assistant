<template>
  <div class="przedmioty">
    <h1>Przedmioty</h1>
    <form @submit="dodajNotatke">
      <label for="przedmiot">Przedmiot</label>
      <input type="text" v-model="przedmiot" />

      <label for="zaliczenie">Temat zaliczenia</label>
      <input type="text" v-model="zaliczenie" />

      <label for="termin">Termin zaliczenia</label>
      <input type="date" v-model="termin" />

      <label for="notatki">Notatki</label>
      <textarea cols="30" rows="10" v-model="notatki"></textarea>

      <label id="wazne">Ważne: </label>
      <input type="checkbox" v-model="wazne" value />

      <div class="wrap">
        <button class="zapisz">Dodaj</button>
      </div>
    </form>
  </div>
  <ul class="notatkiLista" v-if="pokazNotatke">
    <li class="notatkiElement" v-for="notatka in zapis" :key="notatka">
      <strong>{{ notatka.przedmiot }}</strong> - {{ notatka.zaliczenie }}<br />
      {{ notatka.termin }}<br />
      {{ notatka.notatka }}<br /><br />
    </li>
  </ul>
  <button class="pokaz" @click="pokazNotatki">Notatki</button>

  <!-- TODO
  Możliwość zapisywania notatek, 
  terminów zaliczeń, deadlinów w terminarzu -->
</template>

<script>
export default {
  name: "Przedmioty",
  data() {
    return {
      przedmiot: "",
      zaliczenie: "",
      termin: "",
      notatki: "",
      wazne: false,
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
    dodajNotatke(e) {
      e.preventDefault(e);
      
    }
  },
};
</script>

<style scoped>
form,
.notatkiLista {
  width: 500px;
  background: white;
  margin: 35px auto;
  padding: 35px;
  border-radius: 15px;
}
label {
  display: block;
  color: darkslategrey;
  padding-top: 20px;
  letter-spacing: 0.7px;
  font-size: 17px;
  float: left;
}
input,
textarea {
  display: block;
  padding: 10px 0 0 10px;
  width: 100%;
  border: none;
  border-bottom: 1px solid darkgray;
}
input:focus,
textarea:focus {
  outline: none;
  border-bottom: 1px solid darkblue;
}
.zapisz {
  display: block;
  background: lightseagreen;
  color: white;
  padding: 12px 15px 12px 15px;
  margin: 45px 35px 0px 0;
  border: 0;
  border-radius: 13px;
  width: 20%;
}
.wrap {
  display: flex;
  justify-content: center;
}
.zapisz:hover {
  transform: scale(1.12);
}
.pokaz {
  background: lightseagreen;
  color: white;
  padding: 12px 15px 12px 15px;
  margin: 45px 0 15px 0;
  border: 0;
  border-radius: 13px;
  width: 100px;
}
.pokaz:hover {
  transform: scale(1.12);
}
#wazne {
  font-size: 13px;
  font-style: italic;
}
input[type="checkbox"] {
  width: 13px;
  height: 13px;
  padding: 0;
  margin: 0;
  vertical-align: bottom;
  position: relative;
  top: 22px;
  left: 10px;
}
.notatkiLista {
  list-style: none;
  text-align: left;
}
.zapiszBtn {
  padding: 0 25px 0 25px;
}
.notatkiElement {
  display: block;
  justify-content: center;
  margin: 20px;
  padding: 20px;
  outline: 1px solid #000;
}
</style>

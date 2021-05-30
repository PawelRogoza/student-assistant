<template>
  <div class="notatki">
    <h1>Notatki</h1>
  </div>
  <div>
    <ul class="notatkiLista" v-show="pokazNotatke">
    <button class="refresh" @click="odswiezKomponent">&#8635;</button>
      <li class="notatkiElement" v-for="notatka in zapis" :key="notatka">
        <button class="usun" @click="usunNotatke(notatka.id)" data-test='usun'>X</button>
        <button class="edytuj" @click="edytujNotatke(notatka.id)">
          &#9998;
        </button>
        <div class="notatkiContent" :class="{ wazne: notatka.wazne }">
          <strong>{{ notatka.przedmiot }}</strong> - {{ notatka.zaliczenie
          }}<br />
          {{ notatka.termin }}<br />
          {{ notatka.notatka }}<br />
        </div>
      </li>
    </ul>

    <form id="editForm" v-show="pokazFormularz" @submit="edytujNotatkeForm">
      <label for="przedmiot">Przedmiot</label>
      <input type="text" v-model="tempPrzedmiot" />

      <label for="zaliczenie">Temat zaliczenia</label>
      <input type="text" v-model="tempZaliczenie" />

      <label for="termin">Termin zaliczenia</label>
      <input type="date" v-model="tempTermin" />

      <label for="notatki">Notatki</label>
      <textarea
        placeholder="Wpisz swoją notatkę..."
        cols="30"
        rows="10"
        v-model="tempNotatka"
      ></textarea>

      <label id="wazne">Ważne: </label>
      <input type="checkbox" v-model="tempWazne" />

      <div class="wrap">
        <button class="zapisz">Aktualizuj</button>
      </div>
    </form>
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
      pokazFormularz: false,

      tempPrzedmiot: "",
      tempZaliczenie: "",
      tempTermin: "",
      tempNotatka: "",
      tempWazne: false,
      tempId: "",
    };
  },
  mounted() {
    // pobieranie listy notatek z db.json przy starcie komponentu
    this.pobierzNotatki();
  },
  methods: {
    pobierzNotatki() {
      fetch("https://localhost:44304/api/notes").then((res) => {
        res
          .json()
          .then((data) => (this.zapis = data))
          .catch((err) => console.log(err.message));
      });
    },

    odswiezKomponent() {
      window.location.reload(true);
    },

    pokazNotatki() {
      this.pokazNotatke = !this.pokazNotatke;
      console.log("pokaz");
    },

    usunNotatke(id) {
      fetch("https://localhost:44304/api/notes/" + id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
      alert("Usuniętko notatke [" + id + "]");
    },

    async edytujNotatke(id) {
      this.pokazFormularz = !this.pokazFormularz;
      alert("Edytowanie notatki [" + id + "]");

      const res = await fetch(
        "https://localhost:44304/api/notes/" + id
      ).catch((error) => console.log("Error:", error));
      const json = await res.json();

      var jsonParsed = JSON.parse(JSON.stringify(json));

      this.tempPrzedmiot = jsonParsed.przedmiot;
      this.tempZaliczenie = jsonParsed.zaliczenie;
      this.tempTermin = jsonParsed.termin;
      this.tempNotatka = jsonParsed.notatka;
      this.tempWazne = jsonParsed.wazne;
      this.tempId = jsonParsed.id;
    },

    edytujNotatkeForm() {
      var edytowanaNotatka = {
        id: this.tempId,
        przedmiot: this.tempPrzedmiot,
        zaliczenie: this.tempZaliczenie,
        termin: this.tempTermin,
        notatka: this.tempNotatka,
        wazne: this.tempWazne,
      };

      fetch("https://localhost:44304/api/notes/" + this.tempId, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(edytowanaNotatka),
      })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
  },
};
</script>

<style>
.wazne {
  border: 1px solid;
}
.refresh {
  display: flex;
  justify-content: center;
  text-align: center;
  background: lightseagreen;
  color: white;
  padding: 4px;
  margin: 0 auto;
  border: 0;
  border-radius: 30px;
  width: 5%;
}
.refresh:hover {
  transform: scale(1.1);
}
</style>
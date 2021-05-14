<template>
  <div class="notatki">
    <h1>Notatki</h1>
  </div>
  <div>
    <ul class="notatkiLista" v-if="pokazNotatke">
      <li class="notatkiElement" v-for="notatka in zapis" :key="notatka">
        <button class="usun" @click="usunNotatke(notatka.id)">X</button>
        <button class="edytuj" @click="edytujNotatke(notatka.id)">✎</button>
        <div class="notatkiContent" >
          <strong>{{ notatka.przedmiot }}</strong> - {{ notatka.zaliczenie }}<br />
          {{ notatka.termin }}<br />
          {{ notatka.notatka }}<br />
        </div>
      </li>
    </ul>
    <form id="editForm" hidden="true" @submit="edytujNotatkeForm">
      <label for="przedmiot">Przedmiot</label>
      <input type="text" v-model="tempPrzedmiot" />

      <label for="zaliczenie">Temat zaliczenia</label>
      <input type="text" v-model="tempZaliczenie" />

      <label for="termin">Termin zaliczenia</label>
      <input type="date" v-model="tempTermin" />

      <label for="notatki">Notatki</label>
      <textarea placeholder="Wpisz swoją notatkę..." cols="30" rows="10" v-model="tempNotatka"></textarea>

      <label id="wazne">Ważne: </label>
      <input type="checkbox" v-model="tempWazne" value />

      <div class="wrap">
        <button class="zapisz">Dodaj</button>
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
      tempEditID: "",
      tempPrzedmiot:"",
      tempZaliczenie:"",
      tempTermin:"",
      tempNotatka:"",
      tempWazne:""
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
    },
    edytujNotatke(id){
      var element = document.getElementById("editForm");
      element.hidden = !element.hidden;
      alert("Edytowanie notatki ["+id+"]");
      this.tempEditID = id;
    },
    edytujNotatkeForm(){
      console.log(this.tempEditID);
      var editedJSON = {};

      fetch("http://localhost:3000/notatki/"+this.tempEditID, {
        method: 'GET'
      })
      .then((res) => {
        res
          .json()
          .then((data) => (editedJSON = data))
          .catch((err) => console.log(err.message));
      });

      alert("Edytowano notatke ["+this.tempEditID+"]");
      console.log(editedJSON);
    }
  },
};
</script>

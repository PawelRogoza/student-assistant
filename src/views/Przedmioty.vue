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
      <textarea placeholder="Wpisz swoją notatkę..." cols="30" rows="10" v-model="notatka"></textarea>

      <label id="wazne">Ważne: </label>
      <input type="checkbox" v-model="wazne" value />

      <div class="wrap">
        <button class="zapisz">Dodaj</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Przedmioty",
  data() {
    return{
      notatka:null,
      przedmiot:"",
      zaliczenie:"",
      termin:"",
      notatka:"",
      wazne:""
    }
  },
  methods: {
    dodajNotatke() {

      this.notatka = {
        przedmiot:this.przedmiot,
        zaliczenie:this.zaliczenie,
        termin:this.termin,
        notatka:this.notatka,
        wazne:this.wazne
      };

      fetch("http://localhost:3000/notatki", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(this.notatka)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      alert("Dodano notatke");
    }
  },
};
</script>

<style>
form,
.notatkiLista {
  width: 45%;
  background: white;
  margin: 50px auto;
  padding: 35px;
  border-radius: 20px;
  border: 1px solid black;
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
  border-bottom: 1px solid black;
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
  transform: scale(1.1);
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
  transform: scale(1.1);
}
.edytuj {
  background: greenyellow;
  color: black;
  margin: 1px;
  margin-top: 2px;
  border: solid black 1px;
  border-radius: 3px;
  width: 25px;
  height: 25px;
  float: right;
}
.edytuj:hover {
  transform: scale(1.1);
}
.usun {
  background: red;
  color: black;
  margin: 1px;
  margin-top: 2px;
  border: solid black 1px;
  border-radius: 3px;
  width: 25px;
  height: 25px;
  float: right;
}
.usun:hover {
  transform: scale(1.1);
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
  margin: 10px;
  outline: 1px solid #000;
}
.notatkiContent{
  padding: 10px;
}
</style>
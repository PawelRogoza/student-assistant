<template>
  <h1>Kalkulator średniej</h1>

  <form>
    <label>Wpisz oceny</label>
    <input placeholder="Kliknij enter, aby dodać lub Esc by usunąć..." type="text" v-model.number="ocena" @keypress.enter="dodajOcene" class="ocenaTest" />
    <span class="errorMessage" v-show="pokazError">Wprowadź poprawną liczbę</span>

    <span class="usunOcene" @click="cofnijOcene">⌫</span>
    <span class="dodajOcene" @click="dodajOcene">&#9745;</span>

    <br>
    <span class="oceny" v-for="ocena in oceny" :key="ocena">[{{ocena}}] </span>
  </form>
  <button class="obliczSrednia" @click="obliczSrednia">Oblicz średnią</button>
  <button class="obliczSrednia" @click="resetujSrednia">Reset</button>
  <div v-if="pokazSrednia" class="srednia">
    Średnia: {{suma}}
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      ocena: "",
      oceny: [],
      pokazEnter: true,
      pokazError: false,
      suma: null,
      result: null,
      roundedResult: null,
      pokazSrednia: false,
    };
  },
  methods: {
    dodajOcene(e) {
      e.preventDefault();
      if (this.ocena != null && this.ocena >= 2 && this.ocena <= 5) {
        this.oceny.push(this.ocena);
        this.pokazError = false;
      } else {
        this.pokazError = true;
      }
      this.ocena = "";
      console.log(this.oceny);
    },
    cofnijOcene() {
      if(this.oceny != null && this.oceny.length > 0) this.oceny.pop();
    },
    obliczSrednia() {
      var sum = this.oceny.reduce(function (a, b) {
        return a + b;
      });
      this.result = sum / this.oceny.length
      this.roundedResult = Math.round((this.result + Number.EPSILON) * 100) / 100;
      this.suma = this.roundedResult
      this.pokazSrednia = !this.pokazSrednia
    },
    resetujSrednia() {
      window.location.reload();
    }
  },
};
</script>

<style scoped>
.errorMessage {
  color: crimson;
  opacity: 0.7;
  font-style: italic;
  font-size: 12px;
}
.obliczSrednia {
  display: block;
  background: lightseagreen;
  color: white;
  padding: 12px 15px 12px 15px;
  margin: 0 auto;
  margin-top: 30px;
  border: 0;
  border-radius: 13px;
  width: 15%;
}
.obliczSrednia:hover {
  transform: scale(1.1);
}
.srednia {
  margin-top: 30px;
  width: 100px;
  height: 40px;
  padding: 5px;
  display: inline-block;
  justify-content: center;
  border: 1px solid black;
}
.dodaj {
  display: inline-block;
}
.usunOcene {
  display: inline;
  float: right;
  color: lightseagreen;
  font-size: 20px;
}
.usunOcene:hover {
  transform: scale(1.2);
  cursor: pointer;
}
.oceny {
  color: gray;
  font-size: 16px;
}
.dodajOcene {
  display: inline;
  float: right;
  color: lightseagreen;
  font-size: 20px;
  margin-right: 5px;
}
.dodajOcene:hover {
  transform: scale(1.2);
  cursor: pointer;
}
</style>
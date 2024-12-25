<template>
  <div id="calculator">
    <div class="container">
      <!--显示器-->
      <div>
        <div class="display">
          <input
              class="inputArea"
              type="text"
              disabled
              readonly
              v-model="inputValue"
          />
          <input
              class="showArea"
              type="text"
              disabled
              readonly
              v-model="resultValue"
          />
        </div>
      </div>
      <div>
      </div>
      <!--操作按钮    -->
      <div>
        <div class="action_buttons">
          <div class="button">%</div>
          <div class="button">CE</div>
          <div class="button">C</div>
          <div class="button">←</div>
          <div class="button">1/x</div>
          <div class="button">X^2</div>
          <div class="button">2根号X</div>
          <div class="button">/</div>
          <div class="button" @click="actionClick(7)">7</div>
          <div class="button" @click="actionClick(8)">8</div>
          <div class="button" @click="actionClick(9)">9</div>
          <div class="button">X</div>
          <div class="button" @click="actionClick(4)">4</div>
          <div class="button" @click="actionClick(5)">5</div>
          <div class="button" @click="actionClick(6)">6</div>
          <div class="button">-</div>
          <div class="button" @click="actionClick(1)">1</div>
          <div class="button" @click="actionClick(2)">2</div>
          <div class="button" @click="actionClick(3)">3</div>
          <div class="button">+</div>
          <div class="button">+/-</div>
          <div class="button">0</div>
          <div class="button">.</div>
          <div class="button">=</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      inputValue: "",//输入值
      resultValue: ""//结果值
    };
  },
  methods: {
    actionClick(data) {
      if (data === '+') {

      } else if (data === '-') {

      } else if (data === '*') {

      } else if (data === '/') {

      } else if (data === 'Enter') {

      } else if (data === '.') {
        this.inputValue = this.inputValue.toString() + '.'
      } else if (data === 1||data==='1') {
        this.inputValue = parseInt(this.inputValue.toString() + '1')
      } else if (data === 2||data==='2') {
        this.inputValue = parseInt(this.inputValue.toString() + '2')

      } else if (data === 3||data==='3') {
        this.inputValue = parseInt(this.inputValue.toString() + '3')

      } else if (data === 4||data==='4') {
        this.inputValue = parseInt(this.inputValue.toString() + '4')

      } else if (data === 5||data==='5') {
        this.inputValue = parseInt(this.inputValue.toString() + '5')

      } else if (data === 6||data==='6') {
        this.inputValue = parseInt(this.inputValue.toString() + '6')

      } else if (data === 7||data==='7') {
        this.inputValue = parseInt(this.inputValue.toString() + '7')

      } else if (data === 8||data==='8') {
        this.inputValue = parseInt(this.inputValue.toString() + '8')

      } else if (data === 9||data==='9') {
        this.inputValue = parseInt(this.inputValue.toString() + '9')
      } else if (data === 0||data==='0') {
        this.inputValue = parseInt(this.inputValue.toString() + '0')

      }
    },
    handleKeyDown(event) {
      this.actionClick(event.key)
      console.log(event.key)
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  }, beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);

  }
};
</script>

<style scoped>
.container {
  border: 5px solid black;
  width: 340px;

}

.action_buttons {
  display: flex;
  flex-wrap: wrap;
  width: 350px;

}

.button:hover {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.button {
  border: 1px solid rgba(0, 0, 0, 0.31);
  //box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  margin: 2px;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  text-align: center;
  line-height: 80px;
  font-size: 20px;
  font-weight: 500;
}

.display {
  width: 335px;
  background-color: darkgrey;
  border: 3px solid black;

  input {
    width: 320px;
    margin-left: 6px;
    font-size: 20px;
    font-weight: 500;
    border: 0;
  }
}
</style>

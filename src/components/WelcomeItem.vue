<template>
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
   <div v-if="loading" class="loader-overlay">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
    </div>
  <div>
    <main :class="{ 'sign-up-mode': isSignUpMode }">
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <!-- Sign In Form -->
            <form @submit.prevent="SignIn()" autocomplete="off" class="sign-in-form">
              <div class="logo">
                <h4>TransactionsManger</h4>
              </div>

              <div class="heading">
                <h2>Welcome Back</h2>
                <h6>Not registered yet?</h6>
                <a href="#" class="toggle" @click.prevent="toggleMode">Sign up</a>
              </div>

              <div class="actual-form">
                <div class="input-wrap" v-for="(input, index) in signInInputs" :key="index">
                  <input
                    :type="input.type"
                    class="input-field"
                    v-model="input.value"
                    @focus="activateInput"
                    @blur="deactivateInput"
                    required
                  />
                  <label>{{ input.label }}</label>
                </div>

                <input type="submit" value="Sign In" class="sign-btn" />

                <p class="text">
                  Forgotten your password or your login details?
                  <RouterLink to="/forgotpassword" class="toggle">Get Help</RouterLink> signing in
                </p>
              </div>
            </form>

            <!-- Sign Up Form -->
            <form @submit.prevent="SignUp" autocomplete="off" class="sign-up-form">
              <div class="logo">
                <h4>TransactionsManger</h4>
              </div>

              <div class="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <a href="#" class="toggle" @click.prevent="toggleMode">Sign in</a>
              </div>

              <div class="actual-form">
                <div class="input-wrap" v-for="(input, index) in signUpInputs" :key="index">
                  <input
                    :type="input.type"
                    class="input-field"
                    v-model="input.value"
                    @focus="activateInput"
                    @blur="deactivateInput"
                    required
                  />
                  <label>{{ input.label }}</label>
                </div>

                <input type="submit" value="Sign Up" class="sign-btn" />

                <p class="text">
                  By signing up, I agree to the
                  <a href="#">Terms of Service</a> and
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          <!-- Image Slider -->
          <div class="carousel">
            <div class="images-wrapper">
              <img
                v-for="(image, index) in images"
                :key="index"
                :src="image.src"
                :class="['image', `img-${index + 1}`, { show: activeIndex === index + 1 }]"
                alt=""
              />
            </div>

            <div class="text-slider">
              <div class="text-wrap">
                <div class="text-group" :style="{ transform: `translateY(${-(activeIndex - 1) * 2.2}rem)` }">
                  <h2 v-for="(text, index) in texts" :key="index">{{ text }}</h2>
                </div>
              </div>

              <div class="bullets">
                <span
                  v-for="n in texts.length"
                  :key="n"
                  :class="{ active: activeIndex === n }"
                  @click="moveSlider(n)"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import api from '@/plugins/axios';
import swal from '@/swal';
import img1 from './../assets/image1.png'
import img2 from './../assets/image2.png'
import img3 from './../assets/image3.png'
export default {
  data() {
    return {
      loading : false,
      isSignUpMode: false, // Toggle sign-up mode
      activeIndex: 1, // Active image and text slider index
      intervalId: null,
      signInInputs: [
        { type: "email", value: "", label: "Email" },
        { type: "password", value: "", label: "Password" },
      ],
      signUpInputs: [
        { type: "text", value: "", label: "Name" },
        { type: "email", value: "", label: "Email" },
        { type: "password", value: "", label: "Password" },
      ],
      images: [
        { src: img1 },
        { src: img2 },
        { src: img3 },
      ],
      texts: [
        "Create your own Transactions",
        "Customize as you like",
        "Invite Frineds to your application",
      ],
    };
  },
  methods: {
    async SignUp(){
      const [name, nameInput, passwordInput] = this.signUpInputs;
      const params = {
        username : name.value,
        email : nameInput.value,
        password : passwordInput.value
      }
      if(params.password.length<6){
        swal('Password length should be more than 6 characters','info')
        return
      }
      try{
        this.loading = true
        const response = await api.post('/check-user',{email : params.email})
        if(response.data.exists == true){
          swal("Email already Exists ! Please signIn",'info')
          this.isSignUpMode = false;
        }
        if(response.data.exists == false){
          try{
            const response = await api.post('/signup',params)
            if(response.data.message == "Signup successful! Please check your email to confirm your account."){
              swal('Verication mail sent to your mail!','success')
              this.isSignUpMode = false;
            }
          }
          catch(err){
            if(err.response.data.error){
                swal('Server error!' , 'info')
              }
          }
          finally{

          }
        }
      }
      catch(err){
        if(err.response.data.error){
          swal('Server Error ! Try Agian sometime' , 'info')
        }
      }
      finally{

        this.loading = false
      }
    },
    async SignIn(){
      const [nameInput, passwordInput] = this.signInInputs;
      const params = {
        email : nameInput.value,
        password : passwordInput.value
      }
      try{
        this.loading = true
        const response = await api.post('/check-user',{email : params.email})
        if(response.data.exists == false){
          swal("Email Doesn't Exists ! Please SignUp",'error')
          this.isSignUpMode = true ;
        }
        if(response.data.exists == true){
          try{
            const response = await api.post('/login',params)
            const data = response.data
            const username = data.user.username
            const token = data.token
            const userId = data.user.user_id
            const user = {
              name : username,
              token : token ,
              userId : userId,
            }
            sessionStorage.setItem("userSession", JSON.stringify(user));
       
          }
          catch(err){
            if( err.response.data.error == "Please confirm your email before logging in."){
              swal('Email not Verified','error')
            }
            if( err.response.data.error == "Invalid login credentials"){
              swal('Invalid Password','error')
            }
          }
          finally{
            // this.$router.push({ name: "Dashboard", params: {} });

          }
        }
      }
      catch(err){
        if(err){
          swal('Server Error ! Try Agian sometime' , 'info')
        }
      }
      finally{
        this.loading = false
        this.$router.push({ name: "Dashboard", params: {page : 'Completed Transactions'} });
      }
    },
    toggleMode() {
      this.isSignUpMode = !this.isSignUpMode;
    },
    activateInput(event) {
      event.target.classList.add("active");
    },
    deactivateInput(event) {
      if (!event.target.value) {
        event.target.classList.remove("active");
      }
    },
    moveSlider(index) {
      this.activeIndex = index;
    },
    startAutoScroll() {
      this.intervalId = setInterval(() => {
        this.activeIndex = (this.activeIndex % this.images.length) + 1;
      }, 3000); // Change image every 3 seconds
    },
    stopAutoScroll() {
      clearInterval(this.intervalId);
    },
  },
  mounted() {
    this.startAutoScroll();
  },
  beforeUnmount() {
    this.stopAutoScroll();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: "Poppins", sans-serif;
}
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3); /* Low opacity background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* higher than modals etc. */
}
main {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-color: #CD1C18;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  position: relative;
  width: 100%;
  max-width: 1020px;
  height: 640px;
  background-color: #fff;
  border-radius: 3.3rem;
  box-shadow: 0 60px 40px -30px rgba(0, 0, 0, 0.27);
}

.inner-box {
  position: absolute;
  width: calc(100% - 4.1rem);
  height: calc(100% - 4.1rem);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.forms-wrap {
  position: absolute;
  height: 100%;
  width: 45%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  transition: 0.8s ease-in-out;
}

form {
  max-width: 260px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: opacity 0.02s 0.4s;
}

form.sign-up-form {
  opacity: 0;
  pointer-events: none;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 27px;
  margin-right: 0.3rem;
}

.logo h4 {
  font-size: 1.1rem;
  margin-top: -9px;
  letter-spacing: -0.5px;
  color: #151111;
}

.heading h2 {
  font-size: 2.1rem;
  font-weight: 600;
  color: #151111;
}

.heading h6 {
  color: #bababa;
  font-weight: 400;
  font-size: 0.75rem;
  display: inline;
}

.toggle {
  color: #151111;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  transition: 0.3s;
}

.toggle:hover {
   color: #CD1C18;
}

.input-wrap {
  position: relative;
  height: 37px;
  margin-bottom: 2rem;
}

.input-field {
  position: absolute;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  border-bottom: 1px solid #bbb;
  padding: 0;
  font-size: 0.95rem;
  color: #151111;
  transition: 0.4s;
}

label {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.95rem;
  color : #bbb;
  pointer-events: none;
  transition: 0.4s;
}

.input-field.active {
  border-bottom-color : #151111;
}

.input-field.active + label {
  font-size: 0.75rem;
  top: -2px;
}

.sign-btn {
  font-weight:bolder;
  display: inline-block;
  width: 100%;
  height: 43px;
  background-color : #ffa896;
  color: #000;
  border: none;
  cursor: pointer;
  border-radius: 0.8rem;
  font-size: 0.8rem;
  margin-bottom: 2rem;
  transition: 0.3s;
}

.sign-btn:hover {
  background-color: #CD1C18;
  color: #fff;
}

.text {
  color: #bbb;
  font-size: 0.7rem;
}

.text a {
  color: #bbb;
  transition: 0.3s;
}

.text a:hover {
  color: #CD1C18;
}

main.sign-up-mode form.sign-in-form {
  opacity: 0;
  pointer-events: none;
}

main.sign-up-mode form.sign-up-form {
  opacity: 1;
  pointer-events: all;
}

main.sign-up-mode .forms-wrap {
  left: 55%;
}

main.sign-up-mode .carousel {
  left: 0%;
}

.carousel {
  position: absolute;
  height: 100%;
  width: 55%;
  left: 45%;
  top: 0;
  background-color: #ffa896;
  border-radius: 2rem;
  display: grid;
  grid-template-rows: auto 1fr;
  padding-bottom: 2rem;
  overflow: hidden;
  transition: 0.8s ease-in-out;
}

.images-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.image {
  width: 100%;
  grid-column: 1/2;
  grid-row: 1/2;
  opacity: 0;
  transition: opacity 0.3s, transform 0.5s;
}

.img-1 {
  transform: translate(0, -50px);
}

.img-2 {
  transform: scale(0.4, 0.5);
}

.img-3 {
  transform: scale(0.3) rotate(-20deg);
}

.image.show {
  opacity: 1;
  transform: none;
}

.text-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.text-wrap {
  max-height: 2.2rem;
  overflow: hidden;
  margin-bottom: 2.5rem;
}

.text-group {
  display: flex;
  flex-direction: column;
  text-align: center;
  transform: translateY(0);
  transition: 0.5s;
}

.text-group h2 {
  line-height: 2.2rem;
  font-weight: 600;
  font-size: 1.6rem;
}

.bullets {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bullets span {
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #CD1C18;
  margin: 0 0.25rem;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.bullets span.active {
  width: 1.1rem;
  background-color: #151111;
  border-radius: 1rem;
}

@media (max-width: 850px) {
  .box {
    height: auto;
    max-width: 550px;
    overflow: hidden;
  }

  .inner-box {
    position: static;
    transform: none;
    width: revert;
    height: revert;
    padding: 2rem;
  }

  .forms-wrap {
    position: revert;
    width: 100%;
    height: auto;
  }

  form {
    max-width: revert;
    padding: 1.5rem 2.5rem 2rem;
    transition: transform 0.8s ease-in-out, opacity 0.45s linear;
  }

  .heading {
    margin: 2rem 0;
  }

  form.sign-up-form {
    transform: translateX(100%);
  }

  main.sign-up-mode form.sign-in-form {
    transform: translateX(-100%);
  }

  main.sign-up-mode form.sign-up-form {
    transform: translateX(0%);
  }

  .carousel {
    position: revert;
    height: auto;
    width: 100%;
    padding: 3rem 2rem;
    display: flex;
  }

  .images-wrapper {
    display: none;
  }

  .text-slider {
    width: 100%;
  }
}

@media (max-width: 530px) {
  main {
    padding: 1rem;
  }

  .box {
    border-radius: 2rem;
  }

  .inner-box {
    padding: 1rem;
  }

  .carousel {
    padding: 1.5rem 1rem;
    border-radius: 1.6rem;
  }

  .text-wrap {
    margin-bottom: 1rem;
  }

  .text-group h2 {
    font-size: 1.2rem;
  }

  form {
    padding: 1rem 2rem 1.5rem;
  }
}
</style>

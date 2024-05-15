import React from 'react';
import Select from 'react-select'
import './RegistirationPage.css'


function RegistirationPage() {

	const handleClickRegister = () => {
		//Register Logic will be implemented here
		//Olcay burada dataları alıp kaan ve seferin modelde yazdığı fonksiyonu çağırman lazım
	}

	
	const handleClickLogIn = () => {
		//Login Logic will be implemented here
		//Olcay burada dataları alıp kaan ve seferin modelde yazdığı fonksiyonu çağırman lazım
	}

	
	// eslint-disable-next-line no-unused-vars
	const handleClickForgotPassword = () => {
		//Detaylıca bakılacak
	}

	const Universities = [
        { value: 'A', label: 'İAÜ' },
        { value: 'B', label: 'OMÜ' },

      ];
  return (
<div class="body">
	<div class="section">
		<div class="container">
			<div class="row full-height justify-content-center">
				<div class="col-12 text-center align-self-center py-5">
					<div class="section pb-5 pt-5 pt-sm-2 text-center">
						<h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
			          	<input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			          	<label for="reg-log"></label>
						<div class="card-3d-wrap mx-auto">
							<div class="card-3d-wrapper">
								<div class="card-front">
									<div class="center-wrap">
										<div class="section text-center">
											<h4 class="pb-3">Log In</h4>
											<div class="form-group">
												<input type="email" class="form-style" placeholder="Email"/>
												<i class="input-icon uil uil-at"></i>
											</div>	
											<div class="form-group mt-2">
												<input type="password" class="form-style" placeholder="Password"/>
												<i class="input-icon uil uil-lock-alt"></i>
											</div>
											<button onClick={handleClickLogIn} class="btn mt-4">Login</button>
                      <div class="form-group mt-2">
                        <p>Or</p>
											<a href="https://www.web-leb.com/code" class="btn "><i class="fa-brands fa-facebook-f"></i></a>
											<a href="https://www.web-leb.com/code" class="btn "><i class="fa-brands fa-google"></i></a>
                      <a href="https://www.web-leb.com/code" class="btn "><i class="fa-brands fa-github"></i></a>
											</div>
                      <p class="mb-0 mt-4 text-center"><a href="https://www.web-leb.com/code" class="link">Forgot your password?</a></p>
				      					</div>
			      					</div>
			      				</div>
								<div class="card-back">
									<div class="center-wrap">
										<div class="section text-center">
											<h4 class="mb-3 pb-3">Sign Up</h4>
											<div class="form-group">
												<input type="text" class="form-style" placeholder="İsim" required/>
												<i class="input-icon uil uil-user"></i>
											</div>	
											<div class="form-group">
												<input type="text" class="form-style" placeholder="Soyisim" required/>
												<i class="input-icon uil uil-user"></i>
											</div>	
											<div class="form-group mt-2">
												<input type="tel" class="form-style" placeholder="Telefon Numarası"/>
												<i class="input-icon uil uil-phone"></i>
											</div>	
											<div class="form-group mt-2">
												<input type="email" class="form-style" placeholder="Okul Maili" required/>
												<i class="input-icon uil uil-at"></i>
											</div>	
                    					  <div class="form-group mt-2">
											
										 		 <Select  class="form-style" placeholder='Şehir Seç' options={Universities} />
											
												<i class="input-icon uil uil-university"></i>
											</div>
											
											<div class="form-group mt-2">
												<input type="password" class="form-style" placeholder="Şifre" required/>
												<i class="input-icon uil uil-lock-alt"></i>
											</div>
											<button onClick={handleClickRegister} class="btn mt-4">Register</button>
				      					</div>
			      					</div>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
	    </div>
	</div>
</div>


 );
}

export default RegistirationPage;

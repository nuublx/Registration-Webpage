<html>

<head>
	<title>Registration Form</title>
	<link rel="stylesheet" type="text/css" href="index.css">

</head>

<body>
	<form id="my-form">
		<div id="fullName">
			<label for="full_name">Full Name<span class="required">*</span></label>
			<input type="text" id="full_name" name="full_name" required>
		</div>

		<div id="userName">
			<label for="user_name">Username<span class="required">*</span></label>
			<input type="text" id="user_name" name="user_name" required>
		</div>


		<div id="birthDate">

			<label for="birthdate">Birthdate<span class="required">*</span></label>
			<div id="birthdate-error"></div>

			<input type="date" id="birthdate" name="birth_date" required>
			<button onclick="getActors()">Actors Born</button>
		</div>

		<div id="phoneNumber">
			<label for="phone">Phone<span class="required">*</span></label>
			<input type="tel" id="phone" name="phone" required>
		</div>
		<div id="Address">
			<label for="address">Address<span class="required">*</span></label>
			<textarea id="address" name="address" required></textarea>
		</div>
		<div id="Password">
			<label for="password">Password<span class="required">*</span></label>
			<input type="password" id="password" name="password" required>
		</div>
		<div id="Password2">
			<label for="confirm_password">Confirm Password<span class="required">*</span></label>
			<input type="password" id="confirm_password" name="confirm_password" required>
		</div>
		<div id="userImage">
			<label for="user_image">User Image<span class="required">*</span></label>
			<input type="file" id="user_image" name="user_image" required>
		</div>
		<div id="Email">
			<label for="email">Email<span class="required">*</span></label>
			<input type="email" id="email" name="email" required>
		</div>
		<div id='Submit'>
			<input type="submit" value="Submit" onclick="submitForm()" form="myForm">
		</div>
	</form>

	<script src="index.js"></script>
</body>

</html>
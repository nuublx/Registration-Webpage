
<html>
<head>
	<title>Registration Form</title>
	<style>
		form {
			margin: 0 auto;
			width: 50%;
			border: 1px solid #ccc;
			padding: 20px;
			background-color: #f7f7f7;
			font-family: Arial, sans-serif;
		}
		label {
			display: block;
			margin-bottom: 5px;
			font-weight: bold;
		}
		input[type="text"], input[type="email"], input[type="password"], input[type="tel"], input[type="file"], textarea {
			padding: 10px;
			border: 1px solid #ccc;
			border-radius: 4px;
			width: 100%;
			box-sizing: border-box;
			margin-bottom: 20px;
		}
		input[type="date"]::-webkit-calendar-picker-indicator {
			background: #fff url('https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png') no-repeat center;
			background-size: 20px;
			width: 30px;
			height: 30px;
			border-radius: 50%;
			cursor: pointer;
			border: none;
			margin-left: 5px;
			vertical-align: middle;
		}
		input[type="date"]::-webkit-inner-spin-button {
			display: none;
		}
		input[type="submit"] {
			background-color: #4CAF50;
			color: white;
			padding: 10px 20px;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			font-size: 16px;
			font-weight: bold;
		}
		input[type="submit"]:hover {
			background-color: #3e8e41;
		}
        #birthdate {
            margin-bottom: 10px;
        }
	</style>
</head>
<body>
	<form id="my-form">
		<label for="full_name">Full Name:</label>
		<input type="text" id="full_name" name="full_name" required>

		<label for="user_name">User Name:</label>
		<input type="text" id="user_name" name="user_name" required>

		<label for="birthdate">Birthdate:</label>
		<input type="date" id="birthdate" name="birth_date" required>

		<label for="phone">Phone:</label>
		<input type="tel" id="phone" name="phone" required>

		<label for="address">Address:</label>
		<textarea id="address" name="address" required></textarea>

		<label for="password">Password:</label>
		<input type="password" id="password" name="password" required>

		<label for="confirm_password">Confirm Password:</label>
		<input type="password" id="confirm_password" name="confirm_password" required>

		<label for="user_image">User Image:</label>
		<input type="file" id="user_image" name="user_image" required>

		<label for="email">Email:</label>
		<input type="email" id="email" name="email" required>

		<input type="submit" value="Submit" onclick="submitForm()">
	</form>

    <script src="index.js"></script>

</body>
</html>

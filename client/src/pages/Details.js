import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import InputGroup from "../components/InputGroup"

function Details() {
	const [form, setForm] = useState({})
	const { id } = useParams()
	const navigate = useNavigate()
	const [errors, setErrors] = useState({})

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}
	const onSubmitHandler = (e) => {
		e.preventDefault()
		axios
			.put(`/api/users/${id}`, form)
			.then((res) => {
				navigate("/")
			})
			.catch((err) => setErrors(err.response.data))
	}

	useEffect(async () => {
		await axios.get(`/api/users/${id}`).then((res) => {
			setForm(res.data)
		})
	}, [])
	return (
		<div className="row p-4">
			<center>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand">Contact Manager</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<a className="nav-link" href="/">
									Home <span className="sr-only">(current)</span>
								</a>
							</li>
							<li className="nav-item active">
								<a className="nav-link" href="/add">
									Add user <span className="sr-only">(current)</span>
								</a>
							</li>
						</ul>
					</div>
				</nav>
				<form onSubmit={onSubmitHandler} encType="multipart/form-data">
					<InputGroup
						label="Email"
						type="text"
						name="Email"
						onChangeHandler={onChangeHandler}
						errors={errors.Email}
						value={form.Email}
					/>
					<InputGroup
						label="Lastname"
						type="text"
						name="Lastname"
						onChangeHandler={onChangeHandler}
						errors={errors.Lastname}
						value={form.Lastname}
					/>
					<InputGroup
						label="Firstname"
						type="text"
						name="Firstname"
						onChangeHandler={onChangeHandler}
						errors={errors.Firstname}
						value={form.Firstname}
					/>
					<InputGroup
						label="type"
						type="text"
						name="type"
						onChangeHandler={onChangeHandler}
						errors={errors.type}
						value={form.type}
					/>
					<InputGroup
						label="Age"
						type="text"
						name="Age"
						onChangeHandler={onChangeHandler}
						errors={errors.Age}
						value={form.Age}
					/>
					<button className="btn btn-primary" type="submit">
						Update user
					</button>
				</form>
			</center>
		</div>
	)
}

export default Details

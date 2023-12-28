import React, { useEffect, useState } from "react"
import InputGroup from "../components/InputGroup"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"

function Add() {
	const navigate = useNavigate()
	const [users, setUsers] = useState([])
	const [form, setForm] = useState({})
	const [errors, setErrors] = useState({})
	const [message, setMessage] = useState("")
	const [show, setShow] = useState(false)

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}
	const onSubmitHandler = async (e) => {
		e.preventDefault()
		navigate("/")
		await axios
			.post("/api/users", form)
			.then((res) => {
				setMessage(res.data.message)
				setForm({})
				setErrors({})
				setShow(true)
				setTimeout(() => {
					setShow(false)
				}, 4000)
			})
			.catch((err) => setErrors(err.response.data))
	}

	useEffect(async () => {
		await axios.get("/api/users").then((res) => {
			setUsers(res.data)
		})
	}, [])
	return (
		<div className="row p-4">
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
			<center>
				<div className="mt-4">
					<h3>Add Contact</h3>
				</div>
				<div className="col-6 col-lg-4">
					<form onSubmit={onSubmitHandler} encType="multipart/form-data">
						<InputGroup
							label="Email"
							type="text"
							name="Email"
							onChangeHandler={onChangeHandler}
							errors={errors.Email}
						/>
						<InputGroup
							label="Lastname"
							type="text"
							name="Lastname"
							onChangeHandler={onChangeHandler}
							errors={errors.Lastname}
						/>
						<InputGroup
							label="Firstname"
							type="text"
							name="Firstname"
							onChangeHandler={onChangeHandler}
							errors={errors.Firstname}
						/>
						<InputGroup
							label="type"
							type="text"
							name="type"
							onChangeHandler={onChangeHandler}
							errors={errors.type}
						/>
						<InputGroup
							label="Age"
							type="text"
							name="Age"
							onChangeHandler={onChangeHandler}
							errors={errors.Age}
						/>
						<button className="btn btn-primary" type="submit">
							Add user
						</button>
					</form>
				</div>
			</center>
		</div>
	)
}

export default Add

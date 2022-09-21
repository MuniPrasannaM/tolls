import React from "react"
import "./ModelTest.scss"
import { connect } from "react-redux";
import { setTolls } from "../../actions/TollsActions";
import { setEntry } from "../../actions/EntryActions";
class Modal extends React.Component {
	// static propTypes = {
	// 	isModalOpen: React.PropTypes.bool.isRequired,
	// 	closeModal: React.PropTypes.func.isRequired,
	// 	style: React.PropTypes.shape({
	// 		modal: React.PropTypes.object,
	// 		overlay: React.PropTypes.object
	// 	})
	// };

	constructor(props) {
		super(props);

		this.outerStyle = {
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			overflow: "auto",
			zIndex: 1
		};

		// default style
		this.style = {
			modal: {
				position: "relative",
				width: this.props.modalWidth,
				padding: 20,
				boxSizing: "border-box",
				backgroundColor: "#fff",
				margin: "40px auto",
				borderRadius: 8,
				zIndex: 2,
				textAlign: "left",
				boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
				backgroundColor: "#F5F5F5",
				...this.props.style.modal
			},
			overlay: {
				position: "fixed",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0,0,0,0.5)",
				...this.props.style.overlay
			}
		};
	}

	// render modal
	render() {
		return (
			<div
				style={{
					...this.outerStyle,
					display: this.props.isModalOpen ? "block" : "none"
				}}
			>
				<div style={this.style.overlay} onClick={this.props.closeModal} />
				<div onClick={this.props.closeModal} />
				<div style={this.style.modal}>{this.props.children}</div>
			</div>
		);
	}
}

// overwrite style
const modalStyle = {
	overlay: {
		backgroundColor: "rgba(0, 0, 0,0.5)"
	}
};

const mainStyle = {
	app: {
		margin: "0px -10% 0px 75%",

	},
	button: {
		backgroundColor: "#408cec",
		border: 0,
		padding: "12px 20px",
		color: "#fff",
		margin: "0 auto",
		width: 150,
		display: "block",
		borderRadius: 3
	}
};

class ModalTest extends React.Component {
	constructor(props) {
		super(props);

		// set initial state
		this.state = {
			isModalOpen: false,
			isInnerModalOpen: false,
			loopTimes: [1, 2, 3, 4],
			tollName:"",
			vehicleNum:"",
			vehicleType:"",
			trafficAmount:0
		};

		// bind functions
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.submitEntry = this.submitEntry.bind(this);
		this.submitTolls = this.submitTolls.bind(this);
		this.onChangeTollName = this.onChangeTollName.bind(this);
		this.onChangeVehicleNum = this.onChangeVehicleNum.bind(this);
		this.onChangeVehicleType = this.onChangeVehicleType.bind(this);
	}

	// close modal (set isModalOpen, true)
	closeModal() {
		this.setState({
			isModalOpen: false
		});
	}

	// open modal (set isModalOpen, false)
	openModal() {
		let height = 450;

		this.setState({
			isModalOpen: true,

		});
	}
	

	onChangeTollName(e){
		// console.log("change toll name ", e)
		this.setState({
			tollName: e.target.value
		})
	}
	onChangeVehicleType(e){
		// console.log("change vehicle type ", e)
		this.setState({
			vehicleType: e.target.value
		})
	}
	onChangeVehicleNum(e){
		// console.log("change toll Num ", e)
		console.log("vehicle num ", e.target.value, " ", this.state, this.props.allTolls.tolls, this.props.allEntry.entry);
		const tollss = this.props.allTolls.tolls;
		const entryy = this.props.allEntry.entry;
		tollss.map(datt => {
			if((datt["TOLL NAME"]).toLocaleLowerCase() === (this.state.tollName).toLocaleLowerCase() )
			{
				Object.keys(datt).map((key, index) => {
					if((this.state.vehicleType).toLocaleLowerCase() === (key).toLocaleLowerCase())
					{
						var foundVehi = false;
						var price = datt[key].split("/")[0]
						
						entryy.map(ent => {
							console.log("ent toll ", this.state.tollName, ent["TOLL NAME"])
							console.log("vehicle type ", this.state.vehicleType, ent["VEHICLE TYPE"])
							console.log("vehicle num ", this.state.vehicleNum, ent["VEHICLE NUMBER"])
							if((ent["TOLL NAME"]).toLocaleLowerCase() === (this.state.tollName).toLocaleLowerCase() && (ent["VEHICLE TYPE"]).toLocaleLowerCase() === (this.state.vehicleType).toLocaleLowerCase() && (ent["VEHICLE NUMBER"]).toLocaleLowerCase() === (e.target.value).toLocaleLowerCase())
							{
								console.log("came here to if ", ent["DATE TIME"] , new Date(ent["DATE TIME"]))
								var d = new Date(ent["DATE TIME"]);
								var hourago = new Date(d.getTime() + (1000*60*60));
								console.log(" d ", d, " hourago ", hourago)
								if( new Date(new Date().toISOString()) >= d && new Date(new Date().toISOString()) <= hourago)
								{
									foundVehi = true;
									price = datt[key].split("/")[1]
								}
							}
						})
						console.log("found vehicle ", price, foundVehi)
						this.setState({
							trafficAmount: price
						})
					}
				})
			}
		})
	}
	submitEntry(e) {
		e.preventDefault();
		console.log(e);
		var tollName = e.target[0].value;
		var vehiType = e.target[1].value;
		var vehiNum = e.target[2].value;
		var traffic = e.target[3].value;
		var result = {}
		result["VEHICLE TYPE"] = vehiType;
		result["VEHICLE NUMBER"] = vehiNum;
		result["DATE TIME"] = new Date().toISOString();
		result["TOLL NAME"] = tollName
		result["TRAFFIC"] = traffic
		this.props.dispatch(setEntry(result));
		
	}
	submitTolls(e) {
		e.preventDefault();
		console.log("hellooooo ", e)
		// e.target.map((dat)=>{
		// 	console.log("dattt ", dat)
		// })
		var name = e.target[0].value;
		var index = 1;
		var result = {};
		result["TOLL NAME"] = name;
		while (index < 13) {

			var vType = e.target[index].value;
			var singleJourney = e.target[index + 1].value;
			var returnJourney = e.target[index + 2].value;
			// console.log(vType, " - ", singleJourney, " - ", returnJourney)
			index += 3;
			result[vType] = singleJourney + "/" + returnJourney
		}
		console.log(result)
		this.props.dispatch(setTolls(result));
		console.log(this.props)
	}
	// render app
	render() {
		console.log("prop  ",this.props)
		return (
			<div style={this.props.appStyle}>
				<button class="button-191" role="button" onClick={this.openModal} >{this.props.buttonname}</button>
				{/* <button style={mainStyle.button} onClick={this.openModal}>
					Open modal
				</button> */}

				<Modal
					modalWidth={this.props.modalWidth}
					isModalOpen={this.state.isModalOpen}
					closeModal={this.closeModal}
					style={modalStyle}
				>
					{this.props.renderForm === "tolls" &&
						<form style={{ textAlign: "center" }} onSubmit={this.submitTolls}>
							<h2 style={{ padding: "0px", margin: "0px 0px 15px 0px" }}>Add New Toll</h2>
							<div>
								<h4 style={{ padding: "0px", margin: "9px 0px 9px 0px" }}>Toll Name*</h4>
								<input type={"text"} className="text-input" placeholder="Enter Toll Name*" name="tollname" />
							</div>
							<div>
								<h4 style={{ padding: "0px", margin: "9px 0px 9px 0px" }}>Vehicle Fair Details*</h4>
								{this.state.loopTimes.map((datttt, index) => {
									return (
										<div style={{ marginBottom: "10px" }}>
											<div className="wrapper">
												<div>
													<select name="menu" id="meun-items">
														<option disabled selected>Select Vehicle Type</option>
														<option value="CAR/JEEP/VAN">CAR/JEEP/VAN</option>
														<option value="LCV">LCV</option>
														<option value="TRUCK/BUS">TRUCK/BUS</option>
														<option value="HEAVY VEHICLES">HEAVY VEHICLES</option>
													</select>
												</div>
												<div>
													<input type={"text"} className="text-input1" placeholder="Singal Journey" name="single" />
												</div>
												<div>
													<input type={"text"} className="text-input1" placeholder="Return Journey" name="return" />
												</div>

											</div>
										</div>
									)
								})}
								<div>
									<button
										style={{

											margin: "auto 0",
											width: "auto",
											marginTop: 10,
											marginRight: 10,
										}}
										className='button-191'
										onClick={this.closeModal}
									>
										Close
									</button>
									<button
										style={{

											margin: "auto 0",
											width: "auto",
											marginTop: 10
										}}
										type="submit"
										className='button-191'
										onClick={this.closeModal}
									>
										Submit
									</button>
								</div>

							</div>
						</form>}
					{this.props.renderForm === "entry" &&
						<form style={{ textAlign: "center" }} onSubmit={this.submitEntry}>
							<h2 style={{ padding: "0px", margin: "0px 0px 15px 0px" }}>Add New Entry</h2>
							<div>
								<h4 style={{ padding: "0px", margin: "0px 0px 9px 0px" }} >Select Toll Name *</h4>
								<select name="toll" id="meun-items" onChange={this.onChangeTollName}>
									<option disabled selected>Select Toll Name*</option>
									{this.props.allTolls.tolls.map((dat)=>{
										return(
											<option value={dat["TOLL NAME"]}>{dat["TOLL NAME"]}</option>
										)
									})}
								</select>
							</div>
							<div>
								<h4 style={{ padding: "0px", margin: "9px 0px 9px 0px" }}>Select Vehicle Type*</h4>
								<select name="vehicle" id="meun-items" onChange={this.onChangeVehicleType}>
									<option disabled selected>Select Vehicle Type*</option>
									<option value="CAR/JEEP/VAN">CAR/JEEP/VAN</option>
									<option value="LCV">LCV</option>
									<option value="TRUCK/BUS">TRUCK/BUS</option>
									<option value="HEAVY VEHICLES">HEAVY VEHICLES</option>
								</select>
							</div>
							<div>
								<h4 style={{ padding: "0px", margin: "9px 0px 9px 0px" }} >Vehicle Number*</h4>
								<input type={"text"} className="text-input" placeholder="Enter Vehicle Number*" name="number" onChange={this.onChangeVehicleNum}/>
							</div>
							<div>
								<h4 style={{ padding: "0px", margin: "9px 0px 9px 0px" }}>Traffic*</h4>
								<input type={"text"} className="text-input" placeholder="Enter Traffic Amount*" number="amount" disabled value={this.state.trafficAmount}/>
							</div>
							<input type="submit" className='button-191' style={{

								margin: 0,
								width: "auto",
								marginTop: 10
							}} onClick={this.closeModal}/>
						</form>
					}
				</Modal>
			</div>
		);
	}
}

// export default ;
const mapStateToProps = (state) => {
	console.log("state ", state);
	return(

		{
			allTolls: state.allTolls,
			allEntry: state.allEntry
		})
};

export default connect(mapStateToProps)(ModalTest);
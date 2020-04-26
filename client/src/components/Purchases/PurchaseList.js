import React from 'react'
import {connect} from 'react-redux'
import {getPurchasesList} from '../../actions/purchase'
import PurchaseForm from './purchaseForm'

class DealersList extends React.Component {
    componentDidMount(){
        this.props.dispatch(getPurchasesList())
    }

    render(){
        // console.log(this.props.dealers)
        return (
            <>
            <h2>Add Purchases</h2>
            {/* <div className="col-md-8"> */}
            <PurchaseForm />
            {/* </div> */}
                <h2>Purchases </h2>
                <div className="row">
                    {this.props.purchases.map((purchase,index) => {
                        return <div key={index}> 
                            <div className="card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">{purchase}</h5> 
                                        {/* <p>{dealer.description}</p> */}
                            </div>
                            </div>
                        </div>
                    })}
                    </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        purchases: state.purchases
    }
}

export default connect(mapStateToProps)(DealersList)
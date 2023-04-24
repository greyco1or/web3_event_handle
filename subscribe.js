import Web3 from "web3";
import InsertToDB from "./dbutil.js";

const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/246a412f52f74832b07b645d3c9b9fed"));

function Subscribe(contract_address, topic, type) {
    
    web3.eth.subscribe("logs", {
        address: contract_address,
        topics: [topic]
    },(err, result) => {
        if(err) {
            console.error(error);
        } else {
            console.log("######################################");
            console.log("New Transaction Event");
            console.type(type);
            console.log("######################################");
            getReceiptFindTransfer(result.transactionHash,type);
        }
    });
}

//Subscribe 함수는 특정 topic을 가진 이벤트만 가져오지만 이 함수는 전체 로그를 다 가져온다.(tokenId랑 contract명 추출해야하니까)
async function getReceiptFindTransfer(txid, type){
    web3.eth.getTransactionReceipt(txid)
    .them((result) => {
        var logs = result.logs;
        for (const log of logs) {
            var topics = log.topics;
            //transfer인 경우
            if (topics[0]=="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") {
                console.log("######################################");
                console.log("FIND Transfer log");
                console.log("######################################");
                var token_id = topics[3];
                //to Address를 가져오니까 nft의 새로운 소유자
                var new_owner = topics[2];
                var contract_address = log.address;
                var before_owner = topics[1];
                //16진수를 decimal 형태로
                token_id = web3.utils.hexToNumberString(token_id);
                InsertToDB(contract_address,token_id,type,before_owner,new_owner);
            }
        }
    });
}

export default Subscribe;
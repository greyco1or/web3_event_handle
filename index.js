import Web3 from "web3";
import Subscribe from "./subscribe.js";

const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/246a412f52f74832b07b645d3c9b9fed"));
//web socket을 쓰는 이유는 이벤트는 조회가 아니라 노드에서 데이터를 전달해주기 때문

const foundation_token_address = "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405";
const foundation_market_address = "0xcDA72070E455bb31C7690a170224Ce43623d0B6f";

//이벤트 처리할 때 특정 주소에서 발생하는 이벤트 가져오기, 혹은 이벤트의 topic명을 가져와서 처리하기(topic0이 어떤 이벤트인지 표현)
const transfer_topic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
//아래처럼 함수명과 매개변수들의 타입을 해싱해서 topic값을 구할 수도 있다.(index, 매개변수명은 제외)
const market_list_topic = web3.utils.sha3("ReserveAuctionCreated (address,address,uint256,uint256,uint256,uint256,uint256)");
const market_sold_topic = web3.utils.sha3("ReserveAuctionFinalized (uint256,address,address,uint256,uint256,uint256)");

Subscribe(foundation_token_address, transfer_topic, "TRANSFER");
Subscribe(foundation_market_address, market_list_topic, "CREATED");
Subscribe(foundation_market_address, market_sold_topic, "FINALIZED");
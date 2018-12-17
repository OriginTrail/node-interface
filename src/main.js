import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';

import Utilities from './Utilities';

window.Utilities = Utilities;

window.Eth = require('ethjs');

window.EventBus = new Vue();

const hubAbi = [
  {
    constant: true,
    inputs: [
      {
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'isContract',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newTokenAddress',
        type: 'address',
      },
    ],
    name: 'setTokenAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'readingStorageAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newReadingAddress',
        type: 'address',
      },
    ],
    name: 'setReadingAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'readingAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newReadingStorageAddress',
        type: 'address',
      },
    ],
    name: 'setReadingStorageAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newProfileAddress',
        type: 'address',
      },
    ],
    name: 'setProfileAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newHoldingStorageAddress',
        type: 'address',
      },
    ],
    name: 'setHoldingStorageAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'profileAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newpPofileStorageAddress',
        type: 'address',
      },
    ],
    name: 'setProfileStorageAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'tokenAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'holdingStorageAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newApprovalAddress',
        type: 'address',
      },
    ],
    name: 'setApprovalAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'holdingAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'approvalAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'profileStorageAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newHoldingAddress',
        type: 'address',
      },
    ],
    name: 'setHoldingAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'ContractsChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
];
window.profileAbi = [
  {
    constant: false,
    inputs: [
      {
        name: 'managementWallet',
        type: 'address',
      },
      {
        name: 'profileNodeId',
        type: 'bytes32',
      },
      {
        name: 'initialBalance',
        type: 'uint256',
      },
      {
        name: 'senderHas725',
        type: 'bool',
      },
      {
        name: 'identity',
        type: 'address',
      },
    ],
    name: 'createProfile',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'depositTokens',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'profile',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'releaseTokens',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'payer',
        type: 'address',
      },
      {
        name: 'identity1',
        type: 'address',
      },
      {
        name: 'identity2',
        type: 'address',
      },
      {
        name: 'identity3',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'reserveTokens',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newMinimalStake',
        type: 'uint256',
      },
    ],
    name: 'setMinimalStake',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
      {
        name: 'newNodeId',
        type: 'bytes32',
      },
    ],
    name: 'setNodeId',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newWithdrawalTime',
        type: 'uint256',
      },
    ],
    name: 'setWithdrawalTime',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'profile',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TokensReleased',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'profile',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amountWithdrawn',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'newBalance',
        type: 'uint256',
      },
    ],
    name: 'TokensWithdrawn',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'startTokenWithdrawal',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'profile',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amountReserved',
        type: 'uint256',
      },
    ],
    name: 'TokensReserved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'profile',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amountDeposited',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'newBalance',
        type: 'uint256',
      },
    ],
    name: 'TokensDeposited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'profile',
        type: 'address',
      },
    ],
    name: 'TokenWithdrawalCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'profile',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'withdrawalDelayInSeconds',
        type: 'uint256',
      },
    ],
    name: 'WithdrawalInitiated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'profile',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TokenDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'oldIdentity',
        type: 'address',
      },
      {
        indexed: false,
        name: 'newIdentity',
        type: 'address',
      },
    ],
    name: 'IdentityTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'profile',
        type: 'address',
      },
      {
        indexed: false,
        name: 'newIdentity',
        type: 'address',
      },
    ],
    name: 'IdentityCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'profile',
        type: 'address',
      },
      {
        indexed: false,
        name: 'initialBalance',
        type: 'uint256',
      },
    ],
    name: 'ProfileCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TokensTransferred',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'oldIdentity',
        type: 'address',
      },
    ],
    name: 'transferProfile',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'sender',
        type: 'address',
      },
      {
        name: 'receiver',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferTokens',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
    ],
    name: 'withdrawTokens',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'hubAddress',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    constant: true,
    inputs: [],
    name: 'hub',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'minimalStake',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'profileStorage',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'version',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'withdrawalTime',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
window.erc725Abi = [
  {
    constant: true,
    inputs: [
      {
        name: '_key',
        type: 'bytes32',
      },
    ],
    name: 'getKey',
    outputs: [
      {
        name: 'purposes',
        type: 'uint256[]',
      },
      {
        name: 'keyType',
        type: 'uint256',
      },
      {
        name: 'key',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'otVersion',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_id',
        type: 'uint256',
      },
      {
        name: '_approve',
        type: 'bool',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_key',
        type: 'bytes32',
      },
    ],
    name: 'removeKey',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_purpose',
        type: 'uint256',
      },
    ],
    name: 'getKeysByPurpose',
    outputs: [
      {
        name: 'keys',
        type: 'bytes32[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_key',
        type: 'bytes32',
      },
      {
        name: '_purposes',
        type: 'uint256[]',
      },
      {
        name: '_type',
        type: 'uint256',
      },
    ],
    name: 'addKey',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
      {
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'execute',
    outputs: [
      {
        name: 'executionId',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_key',
        type: 'bytes32',
      },
      {
        name: '_purpose',
        type: 'uint256',
      },
    ],
    name: 'keyHasPurpose',
    outputs: [
      {
        name: 'result',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_key',
        type: 'bytes32',
      },
    ],
    name: 'getKeyPurposes',
    outputs: [
      {
        name: 'purposes',
        type: 'uint256[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'key',
        type: 'bytes32',
      },
      {
        indexed: false,
        name: 'purposes',
        type: 'uint256[]',
      },
      {
        indexed: true,
        name: 'keyType',
        type: 'uint256',
      },
    ],
    name: 'KeyAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'key',
        type: 'bytes32',
      },
      {
        indexed: false,
        name: 'purposes',
        type: 'uint256[]',
      },
      {
        indexed: true,
        name: 'keyType',
        type: 'uint256',
      },
    ],
    name: 'KeyRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'executionId',
        type: 'uint256',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'ExecutionRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'executionId',
        type: 'uint256',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'Executed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'executionId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'Approved',
    type: 'event',
  },
];
window.tokenAbi = [
  {
    constant: true,
    inputs: [],
    name: 'mintingFinished',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'contributor',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'wallet',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseApproval',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'startTime',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'finishMinting',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'teamAndFoundersWallet',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'advisorsAndPreICO',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'TOTAL_NUM_TOKENS',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseApproval',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: 'remaining',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_wallet',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'transferIsAllowed',
        type: 'bool',
      },
    ],
    name: 'TransferAllowed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'MintFinished',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
];
window.profileStorageAbi = [
  {
    constant: true,
    inputs: [],
    name: 'activeNodes',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
    ],
    name: 'getWithdrawalPending',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'hub',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newActiveNodes',
        type: 'uint256',
      },
    ],
    name: 'setActiveNodes',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
      {
        name: 'stakeReserved',
        type: 'uint256',
      },
    ],
    name: 'setStakeReserved',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
    ],
    name: 'getWithdrawalAmount',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
    ],
    name: 'getStakeReserved',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
      {
        name: 'withdrawalTimestamp',
        type: 'uint256',
      },
    ],
    name: 'setWithdrawalTimestamp',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
    ],
    name: 'getStake',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
      {
        name: 'nodeId',
        type: 'bytes32',
      },
    ],
    name: 'setNodeId',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
      {
        name: 'withdrawalAmount',
        type: 'uint256',
      },
    ],
    name: 'setWithdrawalAmount',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
    ],
    name: 'getWithdrawalTimestamp',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
      {
        name: 'withdrawalPending',
        type: 'bool',
      },
    ],
    name: 'setWithdrawalPending',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
    ],
    name: 'getReputation',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'profile',
    outputs: [
      {
        name: 'stake',
        type: 'uint256',
      },
      {
        name: 'stakeReserved',
        type: 'uint256',
      },
      {
        name: 'reputation',
        type: 'uint256',
      },
      {
        name: 'withdrawalPending',
        type: 'bool',
      },
      {
        name: 'withdrawalTimestamp',
        type: 'uint256',
      },
      {
        name: 'withdrawalAmount',
        type: 'uint256',
      },
      {
        name: 'nodeId',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'payer',
        type: 'address',
      },
      {
        name: 'identity1',
        type: 'address',
      },
      {
        name: 'identity2',
        type: 'address',
      },
      {
        name: 'identity3',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'increaseStakesReserved',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
      {
        name: 'reputation',
        type: 'uint256',
      },
    ],
    name: 'setReputation',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
    ],
    name: 'getNodeId',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'identity',
        type: 'address',
      },
      {
        name: 'stake',
        type: 'uint256',
      },
    ],
    name: 'setStake',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'wallet',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferTokens',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newHubAddress',
        type: 'address',
      },
    ],
    name: 'setHubAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'hubAddress',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
];
window.keccakAbi = [
  {
    constant: false,
    inputs: [],
    name: 'error',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'moveTheBlock',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'a',
        type: 'uint256',
      },
    ],
    name: 'PreIPosle',
    type: 'event',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'message',
        type: 'bytes32',
      },
      {
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'ecrecovery',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'offer_hash',
        type: 'bytes32',
      },
      {
        name: 'DH_wallet',
        type: 'address',
      },
      {
        name: 'DH_node_id',
        type: 'bytes32',
      },
    ],
    name: 'escrowHash',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getBlockTimestamp',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'holderIdentity0',
        type: 'address',
      },
      {
        name: 'holderIdentity1',
        type: 'address',
      },
      {
        name: 'holderIdentity2',
        type: 'address',
      },
      {
        name: 'shift',
        type: 'uint256',
      },
    ],
    name: 'getSolution',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'bytes32',
      },
      {
        name: 'b',
        type: 'bytes32',
      },
    ],
    name: 'keccak2hashes',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'address',
      },
    ],
    name: 'keccakAddress',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'address',
      },
      {
        name: 'b',
        type: 'address',
      },
      {
        name: 'c',
        type: 'address',
      },
    ],
    name: 'keccakAddressAddressAddress',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'adr',
        type: 'address',
      },
      {
        name: 'byt',
        type: 'bytes32',
      },
    ],
    name: 'keccakAddressBytes',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'bytes32',
      },
      {
        name: 'b',
        type: 'address',
      },
    ],
    name: 'keccakBytesAddress',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'bytes32',
      },
      {
        name: 'b',
        type: 'uint256',
      },
    ],
    name: 'keccakIndex',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'adr',
        type: 'address',
      },
      {
        name: 'nod_id',
        type: 'bytes32',
      },
      {
        name: 'data_id',
        type: 'uint256',
      },
    ],
    name: 'keccakOffer',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'keccakSender',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'string',
      },
    ],
    name: 'keccakString',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
];

window.hubAddress = '0x28faef33F88FcEB2493567Ed4388C59801842870';
window.keccakAddress = '0x7aa09d1885483d2285d88fd0f489f86a9350d1ed';


Vue.use(ElementUI);
if (typeof web3 !== 'undefined') {
  // eslint-disable-next-line
  window.eth = new window.Eth(web3.currentProvider);
} else {
  // alert('Please install Metamask');

  window.eth = new window.Eth(new window.Eth.HttpProvider('https://rinkeby.infura.io/1WRiEqAQ9l4SW6fGdiDt'));
}
window.hub = window.eth.contract(hubAbi).at(window.hubAddress);

window.ethereum.enable();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

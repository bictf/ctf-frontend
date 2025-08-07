import {LogicSignal} from "./logicSignal";

export type LookUpTable = Map<LogicSignal[], LogicSignal>
export type SignalConnectionId = string;


export interface LogicChart {
  sources: LogicSignalSource[];
  gates: LogicGate[];

}

export interface LogicGate {
  id: string;
  inputNodeIds: SignalConnectionId[];
  outputNodeId: SignalConnectionId;
  lookUpTable: LookUpTable;
  displayText: string;
}

export interface LogicSignalSource {
  id: string;
  outputNodeId: SignalConnectionId;
}

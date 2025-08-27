export interface AgentData {
  id: number;
  name: string;
  fullName: string;
  loginid: string;
  agentAutoID: number;
  agentID: string;
  agentName: string;
  agentExtension: number;
  email: string;
  mobile: string;
  extension: number;
  role: number[];
  user_type: string;
  department: number;
  subdepartment: number;
  image: string | null;
  agentCampaign: {
    id: number;
    campaign_id: string;
    user_id: string;
    priority: number;
    sessionid: string;
  }[];
  campaigns: string[];
  gender: string;
  employee_id: string;
  nwd_call: number;
  isd_call: number;
  transfer_call: number;
  debugging: number;
  remoteIP: string;
  expireDuration: number;
  expireTimestamp: number;
  sessionid: string;
  userloginid: number;
}

export interface JwtPayload {
  autoid: number;
  name: string;
  loginid: string;
  extension: number;
  usertype: string;
  sessionid: string;
  info: string;
  iat: number;
  exp: number;
}

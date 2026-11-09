type ApiFile = {
	url: string;
	name: string;
	type: "startAndEnd" | "range" | "complete";
	extension: "csv" | "json";
};

export const apiFiles: ApiFile[] = [
	{
		url: "https://cbpfapi.unocha.org/vo2/odata/MstPooledFund?$format=csv",
		name: "MstPooledFund",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo2/odata/MstAllocationSource?$format=csv",
		name: "MstAllocationSource",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo2/odata/MstOrgType?$format=csv",
		name: "MstOrgType",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo2/odata/MstClusters?$format=csv",
		name: "MstClusters",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://cbpfgms.github.io/pfbi-data/mst/MstCountry.json",
		name: "MstRegions",
		type: "complete",
		extension: "json",
	},
	{
		url: "https://cbpfapi.unocha.org/vo2/odata/DonorMaster?$format=csv",
		name: "MstDonors",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://pfbi-eastus2-api-site.azurewebsites.net/bdt2/api/public/v1/beneficiary/?isByLocation=false&process_status=all&$format=csv",
		name: "TotalBeneficiaries",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://pfbi-eastus2-api-site.azurewebsites.net/bdt2/api/public/v1/beneficiaryByPartnerType/?isByLocation=false&process_status=all&$format=csv",
		name: "TotalBeneficiariesByPartner",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://pfbi-eastus2-api-site.azurewebsites.net/bdt2/api/public/v1/beneficiaryByCluster/?isByLocation=false&process_status=all&$format=csv",
		name: "TotalBeneficiariesBySector",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://pfbi-eastus2-api-site.azurewebsites.net/bdt2/api/public/v1/beneficiary/?isByLocation=false&process_status=all&allocation_category=NON_US&$format=csv",
		name: "TotalBeneficiariesWithoutUS",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://pfbi-eastus2-api-site.azurewebsites.net/bdt2/api/public/v1/beneficiaryByPartnerType/?isByLocation=false&process_status=all&allocation_category=NON_US&$format=csv",
		name: "TotalBeneficiariesByPartnerWithoutUS",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://pfbi-eastus2-api-site.azurewebsites.net/bdt2/api/public/v1/beneficiaryByCluster/?isByLocation=false&process_status=all&allocation_category=NON_US&$format=csv",
		name: "TotalBeneficiariesBySectorWithoutUS",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo3/odata/GlobalGenericDataExtract?SPCode=PROJECT_CLUSTER_OneGMS&PoolfundCodeAbbrv=&AllocationYear=&FundTypeId=1&$format=csv",
		name: "ProjectCluster",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo3/odata/GlobalGenericDataExtract?SPCode=ALLOCATION_TOTAL_V2&PoolfundCodeAbbrv=&ShowAllPooledFunds=1&FundingType=2&ShowNSFT=",
		name: "AllocationsByYearAndFund",
		type: "startAndEnd",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo3/odata/GlobalGenericDataExtract?SPCode=ALLOCATION_TOTAL_V2&PoolfundCodeAbbrv=&ShowAllPooledFunds=1&FundingType=2&ShowNSFT=0",
		name: "AllocationsByYearAndFundWithoutUS",
		type: "startAndEnd",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo3/odata/GlobalGenericDataExtract?SPCode=PF_PROJ_SUMMARY&PoolfundCodeAbbrv=&ShowAllPooledFunds=&FundTypeId=1",
		name: "ProjectSummary",
		type: "range",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo3/odata/GlobalGenericDataExtract?SPCode=PF_RPT_CLST_BENEF&PoolfundCodeAbbrv=&ShowAllPooledFunds=&FundTypeId=1",
		name: "SectorsData",
		type: "range",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo2/odata/AllocationTypes?PoolfundCodeAbbrv=",
		name: "MstAllocationsTypes",
		type: "range",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo3/odata/GlobalGenericDataExtract?SPCode=PF_ORG_SUMMARY&PoolfundCodeAbbrv=&FundTypeId=",
		name: "MstOrganizations",
		type: "complete",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo3/odata/GlobalGenericDataExtract?SPCode=ALLOCATION_TOTAL_V2&PoolfundCodeAbbrv=&FundingType=3",
		name: "AllocationsLollipop",
		type: "startAndEnd",
		extension: "csv",
	},
	{
		url: "https://cbpfapi.unocha.org/vo3/odata/GlobalGenericDataExtract?SPCode=ALLOCATION_TOTAL_V2&PoolfundCodeAbbrv=&FundingType=3&ShowNSFT=0",
		name: "AllocationsLollipopWithoutUS",
		type: "startAndEnd",
		extension: "csv",
	},
];

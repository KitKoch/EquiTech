GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Jobs_Insert_V2]
			@Title nvarchar(200),
			@Description nvarchar(4000),
			@Requirements nvarchar(3000),
			@JobTypeId int, 
			@JobStatusId int,  
			@OrganizationId int,
			@LocationId int, 
			@RemoteStatusId int, 
			@ContactName nvarchar(100), 
			@ContactPhone nvarchar(20),
			@ContactEmail nvarchar(200), 
			@EstimatedStartDate datetime2, 
            @EstimatedFinishDate datetime2,
			@CreatedBy int, 
			@ModifiedBy int, 
			@BatchJobRequirements [dbo].[BatchJobRequirements]READONLY,
			@Id int OUTPUT

as


/*

Declare @Id int = 0

Declare		@Title nvarchar(200)= 'Junior Software Developer',
			@Description nvarchar(4000)= 'Backend developer SQl and C# required' ,
			@Requirements nvarchar(3000) = 'Less than 5yrs experience',
			@JobTypeId int = '1', 
			@JobStatusId int = '1',  
			@OrganizationId int ='1',
			@LocationId int = '5', 
			@RemoteStatusId int ='1', 
			@ContactName nvarchar(100) ='Sally Fields', 
			@ContactPhone nvarchar(20) = '555-555-5555',
			@ContactEmail nvarchar(200)= 'SallyFields@gmailcom', 
			@EstimatedStartDate datetime2 = '06/01/2023', 
            @EstimatedFinishDate datetime2 = '06/01/2024',
			@CreatedBy int = 3,
			@ModifiedBy int = 3,
			@BatchJobRequirements [dbo].[BatchJobRequirements]

	Insert into @BatchJobRequirements(Description)
	Values ('Hello'), ('World')

	EXECUTE [dbo].[Jobs_Insert_V2]

			@Title,
			@Description,
			@Requirements,
			@JobTypeId, 
			@JobStatusId,  
			@OrganizationId,
			@LocationId, 
			@RemoteStatusId, 
			@ContactName, 
			@ContactPhone,
			@ContactEmail, 
			@EstimatedStartDate, 
            @EstimatedFinishDate,
			@CreatedBy,  
			@ModifiedBy, 
			@BatchJobRequirements,
			@Id OUTPUT 

	Select j.description, 
		 er.description 
	from dbo.Jobs as j inner join dbo.EducationRequirements as er
	on er.description = j.requirements

Execute [dbo].[Jobs_SelectById] @Id

*/

Begin

INSERT INTO dbo.Jobs
			  ([Title]
			  ,[Description]
			  ,[Requirements]
			  ,[JobTypeId] 
			  ,[JobStatusId] 
			  ,[OrganizationId]  
			  ,[LocationId]  
			  ,[RemoteStatusId]
			  ,[ContactName]
			  ,[ContactPhone]
			  ,[ContactEmail]
			  ,[EstimatedStartDate]
			  ,[EstimatedFinishDate]
			  ,[CreatedBy]
			  ,[ModifiedBy])

	Values	(@Title,
			@Description,
			@Requirements,
			@JobTypeId, 
			@JobStatusId,  
			@OrganizationId,
			@LocationId, 
			@RemoteStatusId, 
			@ContactName, 
			@ContactPhone,
			@ContactEmail, 
			@EstimatedStartDate, 
            @EstimatedFinishDate,
			@CreatedBy,
			@ModifiedBy)
      
  SET @Id = SCOPE_IDENTITY()


------- insert into Education Requirements Table ----
	
	Insert into [dbo].[EducationRequirements] 
					([Description])
	Select [b].[Description]

	From @BatchJobRequirements as b

	Where Exists (
					   Select 1
					   From dbo.EducationRequirements as er
					   Where er.Description = b.Description
					)

End 

GO

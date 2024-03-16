GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Jobs_Update]
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
			@ModifiedBy int, 
			@Id int OUTPUT

as

/*

 DECLARE    @Title nvarchar(200) = 'Senior Developer',
			@Description nvarchar(4000) = 'Full Stack Developer',
			@Requirements nvarchar(3000) = '5 years min experience',
			@JobTypeId int = 2, 
			@JobStatusId int = 1,  
			@OrganizationId int = 1,
			@LocationId int = 5, 
			@RemoteStatusId int = 1, 
			@ContactName nvarchar(100) = 'Jenny Gonzales-Smith', 
			@ContactPhone nvarchar(20) = '555-867-5309',
			@ContactEmail nvarchar(200) = 'Jenny@gmail.com', 
			@EstimatedStartDate datetime2 = '04/09/23', 
            @EstimatedFinishDate datetime2 = '04/10/24', 
			@ModifiedBy int = 3, 
			@Id int = 6

			Execute [dbo].[Jobs_SelectById] @Id

			Execute [dbo].[Jobs_Update]

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
			@ModifiedBy, 
			@Id 

			Execute [dbo].[Jobs_SelectById] @Id

		



*/

BEGIN

Declare @DateModified datetime2 = getutcdate()

UPDATE [dbo].[Jobs]
   SET [Title] = @Title
      ,[Description] = @Description
      ,[Requirements] = @Requirements
      ,[JobTypeId] = @JobTypeId
      ,[JobStatusId] = @JobStatusId
      ,[OrganizationId] = @OrganizationId
      ,[LocationId] = @LocationId
      ,[RemoteStatusId] = @RemoteStatusId
      ,[ContactName] = @ContactName
      ,[ContactPhone] = @ContactPhone
      ,[ContactEmail] = @ContactEmail
      ,[EstimatedStartDate] = @EstimatedStartDate
      ,[EstimatedFinishDate] = @EstimatedFinishDate
      ,[DateModified] = @DateModified
      ,[ModifiedBy] = @ModifiedBy

 WHERE Id = @Id

END 
GO

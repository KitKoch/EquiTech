GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[JobLinks_Insert]
				(@UniqueCode varchar(64)
				,@JobId int				
				,@CreatedBy int				
				,@Id int OUTPUT)

as


/*  TEST CODE


select *
from dbo.JobLinks

Declare			@UniqueCode varchar(64) = 'abcd123'
				,@JobId int	= 101
				,@CreatedBy int = 8		
				,@Id int 

Execute dbo.JobLinks_Insert
				@UniqueCode
				,@JobId
				,@CreatedBy
				,@Id

select *
from dbo.JobLinks


*/

BEGIN

		Insert into dbo.JobLinks
					(UniqueCode
					,JobId					
					,CreatedBy
					,ModifiedBy)


		Values 
				(@UniqueCode
				,@JobId				
				,@CreatedBy
				,@CreatedBy)

			SET @Id = SCOPE_IDENTITY();


END
GO

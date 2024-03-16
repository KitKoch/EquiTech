GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AppointmentServices](
	[AppointmentId] [int] NOT NULL,
	[ServiceId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[IsFree] [bit] NOT NULL,
	[IsEmergency] [bit] NOT NULL,
	[EmergencyFee] [decimal](7, 2) NULL,
 CONSTRAINT [PK_AppointmentServices] PRIMARY KEY CLUSTERED 
(
	[AppointmentId] ASC,
	[ServiceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AppointmentServices] ADD  CONSTRAINT [DF_AppointmentServices_DateCreated_1]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[AppointmentServices] ADD  CONSTRAINT [DF_AppointmentServices_IsFree_1]  DEFAULT ((0)) FOR [IsFree]
GO
ALTER TABLE [dbo].[AppointmentServices] ADD  CONSTRAINT [DF_AppointmentServices_IsEmergency_1]  DEFAULT ((0)) FOR [IsEmergency]
GO
ALTER TABLE [dbo].[AppointmentServices]  WITH CHECK ADD  CONSTRAINT [FK_AppointmentServices_Appointments] FOREIGN KEY([AppointmentId])
REFERENCES [dbo].[Appointments] ([Id])
GO
ALTER TABLE [dbo].[AppointmentServices] CHECK CONSTRAINT [FK_AppointmentServices_Appointments]
GO

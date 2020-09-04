﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using scoutsHunt.Service;

namespace scoutsHunt.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5");

            modelBuilder.Entity("scoutsHunt.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Code")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Ended")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Length")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Started")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("scoutsHunt.Models.Hiker", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("GameId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("Hikers");
                });

            modelBuilder.Entity("scoutsHunt.Models.Spot", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("HikerId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("SpotMoment")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("HikerId");

                    b.ToTable("Spots");
                });

            modelBuilder.Entity("scoutsHunt.Models.Hiker", b =>
                {
                    b.HasOne("scoutsHunt.Models.Game", null)
                        .WithMany("Hikers")
                        .HasForeignKey("GameId");
                });

            modelBuilder.Entity("scoutsHunt.Models.Spot", b =>
                {
                    b.HasOne("scoutsHunt.Models.Hiker", null)
                        .WithMany("Spots")
                        .HasForeignKey("HikerId");
                });
#pragma warning restore 612, 618
        }
    }
}
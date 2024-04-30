﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MinimalApiProject.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.4");

            modelBuilder.Entity("MinimalApiProject.Cliente", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataCadastro")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Clientes");
                });

            modelBuilder.Entity("MinimalApiProject.Emprestimo", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClienteId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataDevolucaoPrevista")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DataDevolucaoReal")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataEmprestimo")
                        .HasColumnType("TEXT");

                    b.Property<string>("LivroId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("StatusEmprestimo")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal?>("ValorMulta")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.HasIndex("LivroId");

                    b.ToTable("Emprestimos");
                });

            modelBuilder.Entity("MinimalApiProject.Livro", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Autor")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Categoria")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataCadastro")
                        .HasColumnType("TEXT");

                    b.Property<string>("ISBN")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Livros");
                });

            modelBuilder.Entity("MinimalApiProject.Emprestimo", b =>
                {
                    b.HasOne("MinimalApiProject.Cliente", "Cliente")
                        .WithMany()
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MinimalApiProject.Livro", "Livro")
                        .WithMany()
                        .HasForeignKey("LivroId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cliente");

                    b.Navigation("Livro");
                });
#pragma warning restore 612, 618
        }
    }
}

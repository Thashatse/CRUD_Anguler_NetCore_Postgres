PGDMP          #                {            CRUD2    15.2    15.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16436    CRUD2    DATABASE     �   CREATE DATABASE "CRUD2" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_South Africa.1252';
    DROP DATABASE "CRUD2";
                postgres    false            �            1259    16437    contacts    TABLE     �   CREATE TABLE public.contacts (
    id bigint NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    telephonenumber numeric NOT NULL,
    emailaddresss text NOT NULL,
    dateofbirth timestamp without time zone NOT NULL
);
    DROP TABLE public.contacts;
       public         heap    postgres    false            �            1259    16442    contacts_id_seq    SEQUENCE     x   CREATE SEQUENCE public.contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.contacts_id_seq;
       public          postgres    false    214                       0    0    contacts_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;
          public          postgres    false    215            �            1259    16443    users    TABLE     n   CREATE TABLE public.users (
    id bigint NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            i           2604    16448    contacts id    DEFAULT     j   ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);
 :   ALTER TABLE public.contacts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            �          0    16437    contacts 
   TABLE DATA           b   COPY public.contacts (id, name, surname, telephonenumber, emailaddresss, dateofbirth) FROM stdin;
    public          postgres    false    214   �       �          0    16443    users 
   TABLE DATA           7   COPY public.users (id, username, password) FROM stdin;
    public          postgres    false    216   B                  0    0    contacts_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.contacts_id_seq', 42, true);
          public          postgres    false    215            k           2606    16450    contacts contact_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.contacts DROP CONSTRAINT contact_pkey;
       public            postgres    false    214            m           2606    16452    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �   O  x^u��N�@��ӧ������nO�hb�F�=zYp���F�ӻ,4��a�o��0�\^��m��m�Z(�:V�.��tQ�bͫ�1*d�� &����5���ׇ��R���֗g���r�v=NH<DR<a2a:&2�
8z��=|���[ƐL��C�H��`p.���b�K�p!������l��hz�s1��WM��^?���*�<A�{ڧ�&4���S�\CV�����U��Kb�X��^c�70����;`>@)��cc��z��H�0��k��~.'v i}2x�u��h��'��H�Xt<_r�l���ޣ ~ ;%�      �      x^3�LL��̃�\1z\\\ 8Z     